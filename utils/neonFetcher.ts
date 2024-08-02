import { Station, Train } from '@/types/types';
import { neon } from '@neondatabase/serverless';

function getDirection(tripId: string): string {
  const tripPath = tripId.split('_')[1];
  const split = tripPath.split('..');
  let direction;
  if (split.length === 1) {
    direction = tripPath.split('.')[1][0];
  } else {
    direction = split[1][0];
  }

  if (direction != 'N' && direction != 'S') return '';
  return direction;
}

export function buildTrainData(trains: Train[], station: Station): Station {
  let northStationTrains = trains?.filter(
    (train) =>
      train.stop_id === station.stopId && getDirection(train.trip_id) === 'N',
  );

  let southStationTrains = trains?.filter(
    (train) =>
      train.stop_id === station.stopId && getDirection(train.trip_id) === 'S',
  );

  if (station.n_headsign === '') northStationTrains = [];
  if (station.s_headsign === '') southStationTrains = [];

  const newTrainData = {
    ...station,
    n_trains: northStationTrains,
    s_trains: southStationTrains,
  };

  return newTrainData;
}

const sql = neon(process.env.EXPO_PUBLIC_DATABASE_URL!);

// Utility to perform retries
async function retry<T>(
  operation: () => Promise<T>,
  retries: number,
  delay: number,
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 1) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retry(operation, retries - 1, delay);
    } else {
      throw error;
    }
  }
}

// Refactored to use async generator
async function* fetchTrainData(
  stops: Station[],
): AsyncGenerator<Station, void, unknown> {
  const TIMEOUT_MS = 500; // Maximum delay for primary before checking secondary
  const RETRY_TIMES = 3;
  const RETRY_DELAY = 200;

  for (const stop of stops) {
    const stopId = stop.stopId;

    const fetchPrimary = () =>
      sql('SELECT * FROM arrivals WHERE stop_id = $1', [stopId]).then(
        (data) => ({ source: 'primary', data }),
      );

    const fetchSecondary = () =>
      sql('SELECT * FROM arrivals_secondary WHERE stop_id = $1', [stopId]).then(
        (data) => ({ source: 'secondary', data }),
      );

    const primaryPromise = retry(
      () =>
        new Promise(async (resolve, reject) => {
          try {
            const data = await fetchPrimary();
            resolve(data);
          } catch (error) {
            reject(error);
          }
        }),
      RETRY_TIMES,
      RETRY_DELAY,
    );

    const fallbackPromise = new Promise((resolve) =>
      setTimeout(() => {
        retry(fetchSecondary, RETRY_TIMES, RETRY_DELAY).then(resolve);
      }, TIMEOUT_MS),
    );

    try {
      const result = (await Promise.race([
        primaryPromise,
        fallbackPromise,
      ])) as {
        source: string;
        data: Train[];
      };
      const newTrainData = buildTrainData(result.data, stop);
      console.log('new train data', newTrainData);
      yield newTrainData;
    } catch (error) {
      console.error(`Error fetching data for stopId ${stopId}:`, error);
    }
  }
}

export default fetchTrainData;

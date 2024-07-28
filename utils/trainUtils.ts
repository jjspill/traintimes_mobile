// utils/TrainUtils.ts
import { Station, Train } from '@/types/types';
import { parseISO, differenceInSeconds } from 'date-fns';

function processTrains(trains: Train[] | null) {
  if (!trains) return [];
  const currentZonedTime = new Date();

  return trains
    .map((train) => {
      const arrivalTimeZoned = parseISO(train.arrival_time); // Already in Eastern Time
      const timeDiffInSeconds = differenceInSeconds(
        arrivalTimeZoned,
        currentZonedTime,
      );
      return {
        ...train,
        timeDiffInSeconds,
      };
    })
    .filter((train) => train.timeDiffInSeconds >= -30)
    .sort((a, b) => a.timeDiffInSeconds - b.timeDiffInSeconds) // Sort based on timeDiffInSeconds
    .map((train) => {
      const minutes = Math.floor(train.timeDiffInSeconds / 60);
      if (minutes <= 0) {
        train.arrival_time = 'arriving';
      } else {
        train.arrival_time = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
      }
      return train;
    });
}

export const fixArrivalTime = (station: Station) => {
  station.n_trains = processTrains(station.n_trains);
  station.s_trains = processTrains(station.s_trains);
};

export function getDirection(tripId: string): string {
  let direction = '';
  const parts = tripId.split('_');
  if (parts.length > 1) {
    const tripPath = parts[1].split('..');
    direction = tripPath.length > 1 ? tripPath[1][0] : tripPath[0][0];
  }
  return ['N', 'S'].includes(direction) ? direction : '';
}

export function getLineFamily(stopId: string): string {
  const lineLetter = stopId[0];
  return lineFamilies[lineLetter] || 'Unknown';
}

const lineFamilies: Record<string, string> = {
  '1': '7 Ave',
  '2': '7 Ave',
  '3': '7 Ave',
  '4': 'Lexington Ave',
  '5': 'Lexington Ave',
  '6': 'Lexington Ave',
  '7': 'Flushing',
  '9': 'Shuttle',
  A: '8 Ave',
  C: '8 Ave',
  E: '8 Ave',
  B: '6 Ave',
  D: '6 Ave',
  F: '6 Ave',
  M: '6 Ave',
  N: 'Broadway',
  Q: 'Broadway',
  R: 'Broadway',
  W: 'Broadway',
  L: '14 St',
  J: 'Nassau St',
  Z: 'Nassau St',
  G: 'Crosstown',
};

function adjustDistances(stops: Station[]): void {
  const groupMinDistances: Record<string, number> = {};

  stops.forEach((stop) => {
    if (!stop.distance) return;
    const key = `${stop.stopName}-${getLineFamily(stop.stopId)}`;
    if (key in groupMinDistances) {
      groupMinDistances[key] = Math.min(groupMinDistances[key], stop.distance);
    } else {
      groupMinDistances[key] = stop.distance;
    }
  });

  stops.forEach((stop) => {
    const key = `${stop.stopName}-${getLineFamily(stop.stopId)}`;
    stop.distance = groupMinDistances[key];
  });
}

export function sortSubwayStops(stops: Station[]): Station[] {
  // console.log('stops', stops);
  adjustDistances(stops);
  return stops.sort((a, b) => a.distance! - b.distance!);
}

export function filterStops(
  stops: Station[],
  selectedFamily: string,
): Station[] {
  if (selectedFamily === '') return stops;
  return stops.filter((stop) => getLineFamily(stop.stopId) === selectedFamily);
}

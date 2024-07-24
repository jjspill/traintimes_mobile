import { RawStationData, Station } from '@/types/types';
import stations from '../assets/stations.json';
import { haversineDistance } from './geoUtils';

export const findClosestStations = (
  lat: number,
  lng: number,
  maxDistance = 0.5, // Default max distance in miles
): Station[] => {
  return stations
    .map((station: RawStationData) => {
      const distance = haversineDistance(
        lat,
        lng,
        parseFloat(station.stop_lat),
        parseFloat(station.stop_lon),
      );

      return {
        stopId: station.stop_id,
        stopName: station.stop_name,
        coordinates: {
          lat: parseFloat(station.stop_lat),
          lng: parseFloat(station.stop_lon),
        },
        n_headsign: station.n_headsign,
        s_headsign: station.s_headsign,
        n_trains: null,
        s_trains: null,
        distance,
      };
    })
    .filter((station) => station.distance <= maxDistance);
};

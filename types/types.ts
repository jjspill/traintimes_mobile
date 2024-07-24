export interface Location {
  lat: number;
  lng: number;
}

export interface ApiResponse {
  message: string;
  stops: Station;
}

export interface Train {
  arrival_time: string;
  route_id: string;
  trip_id: string;
  stop_id: string;
  destination: string;
  timeDiffInSeconds: number;
}

export interface RawStationData {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
  n_headsign: string;
  s_headsign: string;
}

export interface Station {
  stopId: string;
  stopName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  n_headsign: string;
  s_headsign: string;
  n_trains: Train[] | null;
  s_trains: Train[] | null;
  distance?: number; // Optional since it might not always be present
}

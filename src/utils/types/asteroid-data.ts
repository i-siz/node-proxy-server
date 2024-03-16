interface CloseApproachDataItem {
  close_approach_date_full: string;
  relative_velocity: {
    kilometers_per_second: string;
  };
}

interface AsteroidInfo {
  id: string;
  name: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachDataItem[];
}

export interface AsteroidData {
  near_earth_objects: {
    [key: string]: AsteroidInfo[];
  };
}

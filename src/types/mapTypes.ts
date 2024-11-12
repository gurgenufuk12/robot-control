export interface MapData {
  info: {
    width: number;
    height: number;
    resolution: number; // in meters
    origin: {
      position: {
        x: number; // in meters
        y: number; // in meters
      };
    };
  };
  data: number[]; // Occupancy grid data (0 = free, 100 = occupied, -1 = unknown)
}

export interface Position {
  x: number; // The robot's x position (in pixels or meters depending on scaling)
  y: number; // The robot's y position (in pixels or meters)
  z: number; // The robot's z position (in pixels or meters)
  orientation: number; // The robot's orientation in radians
}

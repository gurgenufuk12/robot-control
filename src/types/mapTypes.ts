export interface MapData {
  info: {
    width: number;
    height: number;
    resolution: number;
    origin: {
      position: {
        x: number;
        y: number;
      };
    };
  };
  data: number[];
}

export interface Position {
  x: number;
  y: number;
  z: number;
  orientation: number;
}

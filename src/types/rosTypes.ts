export interface OccupancyGrid {
  data: number[];
  info: { width: number; height: number; resolution: number };
}

export interface Pose {
  x: number;
  y: number;
  theta: number;
}

export interface OdometryMessage {
  pose: {
    pose: {
      position: {
        x: number;
        y: number;
        z: number;
      };
      orientation: {
        w: number;
        x: number;
        y: number;
        z: number;
      };
    };
  };
}

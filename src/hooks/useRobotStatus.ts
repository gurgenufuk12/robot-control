import { useState, useEffect } from "react";
import ROSLIB from "roslib";
import { OdometryMessage } from "../types/odometryMessage.ts";
import { Position } from "../types/mapTypes.ts";
import useRosConnection from "./useRosConnection.ts";

interface RobotStatus {
  robotPosition: Position;
  speed: number;
}

const useRobotStatus = () => {
  const { ros, isConnected } = useRosConnection();
  const [status, setStatus] = useState<RobotStatus>({
    robotPosition: { x: 0, y: 0, z: 0, orientation: 0 },
    speed: 0,
  });

  useEffect(() => {
    if (!ros || !isConnected) return;

    const odometryListener = new ROSLIB.Topic({
      ros,
      name: "/robot/odometry",
      messageType: "nav_msgs/Odometry",
    });

    odometryListener.subscribe((message: any) => {
      const odomMessage = message as OdometryMessage;
      const position = odomMessage.pose.pose.position;
      const orientation = odomMessage.pose.pose.orientation;

      const angle = Math.atan2(
        2 * (orientation.w * orientation.z + orientation.x * orientation.y),
        1 - 2 * (orientation.y * orientation.y + orientation.z * orientation.z)
      );

      setStatus((prevState) => ({
        ...prevState,
        position: {
          x: position.x,
          y: position.y,
          z: position.z,
          orientation: angle,
        },
      }));
    });

    return () => {
      odometryListener.unsubscribe();
      ros.close();
    };
  }, [ros]);

  return { status };
};

export default useRobotStatus;

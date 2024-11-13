import React from "react";
import useRosConnection from "../hooks/useRosConnection.ts";
import { publishToTopic } from "../services/rosService.ts";

interface ControlPanelProps {
  speed: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ speed }) => {
  const { ros } = useRosConnection();

  const sendVelocityCommand = (linear: number, angular: number) => {
    const message = {
      linear: { x: linear, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: angular },
    };

    publishToTopic(ros, "/cmd_vel", "geometry_msgs/Twist", message);
  };

  return (
    <div>
      <h3>Control Panel</h3>
      <div>Speed: {speed}</div>
      <button onClick={() => sendVelocityCommand(0.5, 0)}>Move Forward</button>
      <button onClick={() => sendVelocityCommand(-0.5, 0)}>
        Move Backward
      </button>
      <button onClick={() => sendVelocityCommand(0, 1)}>Turn Left</button>
      <button onClick={() => sendVelocityCommand(0, -1)}>Turn Right</button>
    </div>
  );
};

export default ControlPanel;

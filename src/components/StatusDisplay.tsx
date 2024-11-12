import React from "react";

interface StatusDisplayProps {
  isConnected: boolean;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ isConnected }) => (
  <div>
    <h4>Status Display</h4>
    <div>Connection: {isConnected ? "Connected" : "Disconnected"}</div>
  </div>
);

export default StatusDisplay;

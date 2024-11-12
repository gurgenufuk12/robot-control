import React from "react";
import MapCanvas from "../components/MapCanvas.tsx";
import ControlPanel from "../components/ControlPanel.tsx";
import StatusDisplay from "../components/StatusDisplay.tsx";
import useMapData from "../hooks/useMapData.ts";
import useRosConnection from "../hooks/useRosConnection.ts";
import useRobotStatus from "../hooks/useRobotStatus.ts";

const Dashboard: React.FC = () => {
  const mapData = useMapData();
  const { isConnected, error } = useRosConnection();
  const { status } = useRobotStatus();
  const { robotPosition, speed } = status;

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}
    >
      <StatusDisplay isConnected={isConnected} />
      {error && <div>{error}</div>}
      <ControlPanel speed={speed} />
      {mapData && <MapCanvas mapData={mapData} robotPosition={robotPosition} />}
    </div>
  );
};

export default Dashboard;

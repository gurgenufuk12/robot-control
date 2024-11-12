import { useEffect, useState } from "react";
import { initializeRos } from "../services/rosService.ts";

const useRosConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ros = initializeRos("ws://localhost:9090");

  useEffect(() => {
    ros.on("connection", () => {
      setIsConnected(true);
      setError(null);
    });
    ros.on("error", () => {
      setIsConnected(false);
      setError("Failed to connect to ROS bridge");
    });
    ros.on("close", () => {
      setIsConnected(false);
      setError("Connection to ROS bridge closed");
    });
    initializeRos("ws://localhost:9090");
    return () => ros.close();
  }, [ros]);

  return { ros, isConnected, error };
};

export default useRosConnection;

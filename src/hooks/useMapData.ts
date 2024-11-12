import { useState, useEffect } from "react";
import { MapData } from "../types/mapTypes";
import useRosConnection from "./useRosConnection.ts";
import MapService from "../services/mapService.ts";

const useMapData = () => {
  useEffect(() => {
    console.log("useMapData hook mounted");
    return () => {
      console.log("useMapData hook unmounted");
    };
  }, []);

  const [mapData, setMapData] = useState<MapData | null>(null);
  const { ros } = useRosConnection();

  useEffect(() => {
    const mapService = new MapService("ws://localhost:9090");

    mapService.fetchMapData((data: MapData) => {
      setMapData(data);
    });

    return () => mapService.cleanup();
  }, [ros]);

  return mapData;
};

export default useMapData;

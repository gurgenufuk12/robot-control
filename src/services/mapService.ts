import ROSLIB from "roslib";
import { MapData } from "../types/mapTypes";
import { initializeRos, subscribeToTopic } from "./rosService.ts";

class MapService {
  private ros: ROSLIB.Ros;
  private mapTopic: ROSLIB.Topic | null = null;
  private mapDataCallback: Function | null = null;

  constructor(url: string) {
    this.ros = initializeRos(url);
  }

  fetchMapData(callback: Function) {
    this.mapDataCallback = callback;

    this.mapTopic = subscribeToTopic(
      this.ros,
      "/map",
      "nav_msgs/OccupancyGrid",
      (message) => this.handleMapMessage(message)
    );
  }

  handleMapMessage(message: any) {
    const mapData: MapData = {
      info: {
        width: message.info.width,
        height: message.info.height,
        resolution: message.info.resolution,
        origin: {
          position: {
            x: message.info.origin.position.x,
            y: message.info.origin.position.y,
          },
        },
      },
      data: message.data,
    };

    if (this.mapDataCallback) {
      this.mapDataCallback(mapData);
    }
  }

  cleanup() {
    if (this.mapTopic) {
      this.mapTopic.unsubscribe();
    }

    this.ros.close();
  }
}

export default MapService;

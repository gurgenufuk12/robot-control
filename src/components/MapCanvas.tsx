import React, { useRef, useEffect } from "react";
import { MapData, Position } from "../types/mapTypes";

interface MapCanvasProps {
  mapData: MapData;
  robotPosition: Position;
}

const MapCanvas: React.FC<MapCanvasProps> = ({ mapData, robotPosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMap(ctx, mapData);
        drawRobot(ctx, robotPosition);
      }
    }
  }, [mapData, robotPosition]);

  const drawMap = (ctx: CanvasRenderingContext2D, data: MapData) => {
    const mapWidth = data.info.width;
    const mapHeight = data.info.height;
    const resolution = data.info.resolution;
    const originX = data.info.origin.position.x;
    const originY = data.info.origin.position.y;

    for (let i = 0; i < mapHeight; i++) {
      for (let j = 0; j < mapWidth; j++) {
        const index = i * mapWidth + j;
        const occupancyValue = data.data[index];

        let color = "white";
        if (occupancyValue === 100) {
          color = "black";
        } else if (occupancyValue === 0) {
          color = "lightgray";
        }

        const x = j * resolution - originX;
        const y = i * resolution - originY;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, resolution, resolution);
      }
    }
  };

  const drawRobot = (ctx: CanvasRenderingContext2D, position: Position) => {
    const robotSize = 10;

    const x = position.x;
    const y = position.y;
    const orientation = position.orientation;

    ctx.beginPath();
    ctx.arc(x, y, robotSize, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    const directionLength = 20;
    const endX = x + directionLength * Math.cos(orientation);
    const endY = y + directionLength * Math.sin(orientation);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  return (
    <>
      <canvas ref={canvasRef} width="500" height="500" />
      <div>asdasdasdas</div>
    </>
  );
};

export default MapCanvas;

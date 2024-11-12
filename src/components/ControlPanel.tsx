import React from "react";

interface ControlPanelProps {
  speed: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ speed }) => (
  <div>
    <h3>Control Panel</h3>
    <div>Speed: {speed}</div>
  </div>
);

export default ControlPanel;

import { createRoot } from 'react-dom/client';

import { Scene } from '../scene';
import { Panel } from './panel';

export const initControls = (scene: Scene) => {
  const controlsPanel = document.getElementById('controls-panel');
  const root = createRoot(controlsPanel);
  root.render(<Panel scene={scene} />);
};

import './panel.scss';
import React from 'react';

import { Scene } from '../scene';
import { Layers } from '../constants';
import { LayerControls } from './layers';
import { ILayer } from '../models';

interface IProps {
  scene: Scene;
}

export const Panel = (props: IProps) => {
  const handleLayerToggle = (layer: ILayer) => {
    props.scene.layers.toggle(layer.channel);
  };

  return (
    <div className='container'>
      <LayerControls layers={Layers} onLayerToggle={handleLayerToggle} />
    </div>
  );
};

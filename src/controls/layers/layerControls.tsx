import './layerControls.scss';
import React from 'react';

import { ILayer } from '../../models';
import { LayerButton } from './layerButton';

interface IProps {
  layers: ILayer[];

  onLayerToggle?: (layer: ILayer) => void;
}

export const LayerControls = (props: IProps) => {
  return (
    <section className='layer-controls'>
      {props.layers.map((layer) => (
        <LayerButton key={layer.channel} layer={layer} onToggle={props.onLayerToggle} />
      ))}
    </section>
  );
};

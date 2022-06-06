import './layerButton.scss';
import React from 'react';

import { ILayer } from '../../models';

interface IProps {
  layer: ILayer;

  onToggle?: (layer: ILayer) => void;
}

export const LayerButton = (props: IProps) => {
  const [enabled, setEnabled] = React.useState(props.layer.enabled);
  const className = `layer-button ${enabled ? 'layer-button--enabled' : ''}`;

  const handleClick = (e: any) => {
    e.preventDefault();
    setEnabled(!enabled);
    props.onToggle?.(props.layer);
  };

  return (
    <button className={className} type='button' onClick={handleClick}>
      {props.layer.title}
    </button>
  );
};

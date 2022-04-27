import * as THREE from 'three';

import { BaseBuilder } from './base.builder';

export class LabelBuilder extends BaseBuilder<string, THREE.Sprite> {
  public build(text: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 100;
    canvas.classList.add('label');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.font = '24pt Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text.toUpperCase(), 150, 50);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
    });
    return new THREE.Sprite(spriteMat);
  }
}

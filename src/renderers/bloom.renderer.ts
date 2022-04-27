import { Camera, Layers, MeshBasicMaterial, Scene, ShaderMaterial, Vector2, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Constants } from '../constants';
import { Window } from '../utils';
import { BaseRenderer } from './base.renderer';

const BloomPassParams = {
  strength: 5,
  radius: 0,
  threshold: 0,
};

const ShaderPassParams = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv; 
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragment: `
    uniform sampler2D baseTexture;
    uniform sampler2D bloomTexture;
    varying vec2 vUv;
    void main() {
      gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
    }
  `,
};

export class BloomRenderer extends BaseRenderer<EffectComposer> {
  private _bloomPass: UnrealBloomPass;
  private _renderPass: RenderPass;
  private _finalPass: ShaderPass;
  private _bloomComposer: EffectComposer;
  private _finalComposer: EffectComposer;
  private _bloomLayer = new Layers();
  private _darkMaterial = new MeshBasicMaterial({ color: 'black' });
  private _materials: any = {};

  constructor(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
    super();
    this._renderPass = new RenderPass(scene, camera);
    this._bloomLayer.set(Constants.layers.bloom);
    this.initBloomPass();
    this.initBloomComposer(renderer);
    this.initFinalPass();
    this.initFinalComposer(renderer);
  }

  public update() {
    this._bloomComposer.setSize(Window.width, Window.height);
    this._finalComposer.setSize(Window.width, Window.height);
  }

  public render(scene: Scene) {
    scene.traverse(this.darkenNonBloomed);
    this._bloomComposer.render();
    scene.traverse(this.restoreMaterial);
    this._finalComposer.render();
  }

  // private methods

  private initBloomPass() {
    this._bloomPass = new UnrealBloomPass(
      new Vector2(Window.width, Window.height),
      BloomPassParams.strength,
      BloomPassParams.radius,
      BloomPassParams.threshold
    );
  }

  private initFinalPass() {
    this._finalPass = new ShaderPass(
      new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this._bloomComposer.renderTarget2.texture },
        },
        vertexShader: ShaderPassParams.vertex,
        fragmentShader: ShaderPassParams.fragment,
        defines: {},
      }),
      'baseTexture'
    );
    this._finalPass.needsSwap = true;
  }

  private initBloomComposer(renderer: WebGLRenderer) {
    this._bloomComposer = new EffectComposer(renderer);
    this._bloomComposer.renderToScreen = false;
    this._bloomComposer.addPass(this._renderPass);
    this._bloomComposer.addPass(this._bloomPass);
  }

  private initFinalComposer(renderer: WebGLRenderer) {
    this._finalComposer = new EffectComposer(renderer);
    this._finalComposer.addPass(this._renderPass);
    this._finalComposer.addPass(this._finalPass);
  }

  private darkenNonBloomed = (obj: any) => {
    if ((obj.isMesh || obj.isLine) && this._bloomLayer.test(obj.layers) === false) {
      this._materials[obj.uuid] = obj.material;
      obj.material = this._darkMaterial;
      obj.children.forEach((o) => {
        this._materials[o.uuid] = o.material;
        o.material = this._darkMaterial;
      });
    }
  };

  private restoreMaterial = (obj: any) => {
    if (this._materials[obj.uuid]) {
      obj.material = this._materials[obj.uuid];
      obj.children.forEach((o) => {
        o.material = this._materials[o.uuid];
      });
      delete this._materials[obj.uuid];
    }
  };
}

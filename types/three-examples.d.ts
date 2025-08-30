// Type definitions for three.js examples

declare module 'three/examples/jsm/geometries/TextGeometry' {
  import { BufferGeometry, Font } from 'three';
  
  export interface TextGeometryParameters {
    font: Font;
    size?: number;
    height?: number;
    curveSegments?: number;
    bevelEnabled?: boolean;
    bevelThickness?: number;
    bevelSize?: number;
    bevelOffset?: number;
    bevelSegments?: number;
  }
  
  export class TextGeometry extends BufferGeometry {
    constructor(text: string, parameters: TextGeometryParameters);
  }
}

declare module 'three/examples/jsm/loaders/FontLoader' {
  import { Loader, LoadingManager, Font } from 'three';
  
  export class FontLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad?: (responseFont: Font) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(json: any): Font;
  }
  
  export { Font };
}

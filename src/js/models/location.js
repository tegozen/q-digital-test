import * as THREE from 'three';

export default class Location {
  constructor({ path }) {
    this.path = path;
  }

  load = () => {
    return new Promise(resolve => {
      new THREE.TextureLoader().load(this.path, texture => {
        this.texture = texture
        resolve(texture)
      });
    })
  }
}
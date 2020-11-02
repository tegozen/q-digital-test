import * as THREE from 'three';
import data from '../data';
import Arrow from './arrow';

export default class Location {
  constructor({ app, path, siblings, id }) {
    this.path = path;
    this.app = app;
    this.id = id;
    this.siblings = siblings;
  }

  load = () => {
    return new Promise(resolve => {
      new THREE.TextureLoader().load(this.path, texture => {
        this.texture = texture
        resolve(texture)
      });
    })
  }

  generateArrows = () => {
    return new Promise(resolve => {
      let arrows = {}
      resolve(this.siblings.map(id => {
        arrows[id] = new Arrow({ id, app: this.app })
        this.app.scene.add(arrows[id].mesh)
        return arrows[id]
      }))
    })
  }
}
import * as THREE from 'three';
import data from '../data';
import Arrow from './arrow';

export default class Location {
  constructor({ app, path, siblings, id, direction }) {
    this.path = path;
    this.app = app;
    this.id = id;
    this.siblings = siblings;
    this.direction = 0
    if (direction) {
      this.direction = direction;
    }
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
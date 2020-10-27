import * as THREE from 'three';
import data from '../data';
import Arrow from './arrow';

export default class Location {
  constructor({ app, path, siblings, id }) {
    this.path = path;
    this.app = app;
    this.id = id;
    this.siblings = siblings;
    this.arrows = {}
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
    this.arrows = {}
    return new Promise(resolve => {
      this.app.scene.children.filter(child => child.name === 'arrow').forEach(child => {
        this.app.scene.remove(child)
      })

      this.siblings.map(id => {
        this.arrows[id] = new Arrow()
        this.app.scene.add(this.arrows[id].mesh)
      })
      resolve()
    })
  }
}
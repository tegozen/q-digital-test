import * as THREE from 'three';
import Common from './common';
import Location from './location';
import data from '../data';
import api from '../api';

export default class Sphere extends Common {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  init = async () => {
    return new Promise(resolve => {
      this.defaultLocation = new Location({ path: 'locations/default.png' })
      this.defaultLocation.load().then(texture => {
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        this.mesh = this.createMesh(this.geometry, this.material)
        resolve(this)
      })
    })
  }

  changeTo = async (index) => {
    let location = this.app.locations[index];
    let _data = api.dataByid(index)
    if (!location) {
      location = this.app.locations[index] = new Location({ app: this.app, ..._data })
    }

    if (!location.texture) {
      await location.load()
    }

    this.mesh.material.map = location.texture;
    return await location.generateArrows()
  }
}
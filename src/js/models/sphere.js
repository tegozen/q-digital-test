import * as THREE from 'three';
import Common from './common';
import Location from './location';

export default class Sphere extends Common {
  constructor(props) {
    super(props);
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
}
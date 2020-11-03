import * as THREE from 'three';
import Common from './common';
import Location from './location';
import data from '../data';
import api from '../api';

export default class Sphere extends Common {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.defaultPos = -10;
    this.setRedux = props.setRedux;
  }

  init = async (opacity = 1) => {
    return new Promise(resolve => {
      this.defaultLocation = new Location({ path: 'locations/default.png' })
      this.defaultLocation.load().then(texture => {
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          wireframe: false,
          transparent: true,
          opacity
        });
        this.mesh = this.createMesh(this.geometry, this.material)
        this.mesh.material.needsUpdate = true;
        this.mesh.scale.set(-1, 1, -1)
        resolve(this)
      })
    })
  }

  changeTo = async (index, isGenerateArrows = true) => {
    let location = this.app.locations[index];
    let _data = api.dataByid(index)
    if (!location) {
      location = this.app.locations[index] = new Location({ app: this.app, ..._data })
    }

    if (!location.texture) {
      await location.load()
    }

    this.mesh.material.map = location.texture;
    this.app.currentId = index;
    this.setRedux({ currentId: index })

    this.changeRotate(location.direction)
    if (isGenerateArrows) {
      this.app.arrows = await location.generateArrows();
    }
    return this.app.arrows
  }

  changeRotate = (deg) => {
    this.mesh.rotation.y = THREE.MathUtils.degToRad(deg)
  }

  changePosition = (x = 0, y = 0, z = 0) => {
    this.mesh.position.set(x, y, z)
  }

  changeOpacity = (opacity = 1) => {
    this.mesh.material.opacity = opacity
  }

  reset = () => {
    this.changePosition(undefined, undefined, this.defaultPos)
    this.changeOpacity(0)
    this.mesh.material.map = this.defaultLocation.texture;
  }
}
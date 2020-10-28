import * as THREE from 'three';
import api from '../api';
import data from '../data';
import Common from './common';

export default class Arrow extends Common {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.planeWidth = .1;
    this.planeHeight = .3;
    this.init()
  }

  init = () => {
    this.mesh = new THREE.Group()
    this.mesh.position.y = -(this.planeWidth * 2)

    let geometry = new THREE.PlaneGeometry(this.planeWidth, this.planeHeight)
    let material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    let plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = THREE.MathUtils.degToRad(-90)
    plane.rotation.z = THREE.MathUtils.degToRad(90)
    plane.position.x = this.planeHeight / 2
    this.mesh.add(plane)

    let _data = api.dataByid(this.id)
    console.log(_data)

    this.mesh.add(this.createTriangle())
  }

  createTriangle = () => {
    var triangleShape = new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(-(this.planeWidth / 2), this.planeWidth)
      .lineTo(this.planeWidth / 2, this.planeWidth)
      .lineTo(0, 0);

    var extrudeSettings = { amount: .01, bevelEnabled: false };
    var geometry = new THREE.ExtrudeBufferGeometry(triangleShape, extrudeSettings);
    var material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = THREE.MathUtils.degToRad(-90)
    mesh.rotation.z = THREE.MathUtils.degToRad(90)
    mesh.position.x = this.planeHeight + this.planeWidth
    return mesh
  }
}
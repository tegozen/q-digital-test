import * as THREE from 'three';
import api from '../api';
import data from '../data';
import Common from './common';

export default class Arrow extends Common {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.app = props.app;
    this.planeWidth = .1;
    this.planeHeight = .3;
    this.init()
  }

  init = () => {
    this.mesh = new THREE.Group()
    this.mesh.name = 'arrow';
    let group = new THREE.Group()
    group.position.y = -(this.planeWidth * 2)
    group.rotation.y = THREE.MathUtils.degToRad(-90)

    let geometry = new THREE.PlaneGeometry(this.planeWidth, this.planeHeight)
    let material = new THREE.MeshStandardMaterial({ visible: false });
    let plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = THREE.MathUtils.degToRad(-90)
    plane.rotation.z = THREE.MathUtils.degToRad(90)
    plane.position.x = this.planeHeight / 2
    group.add(plane)

    let _data = api.dataByid(this.id)

    group.add(this.createTriangle())

    this.mesh.add(group)

    let { x, y, z } = _data.coords;
    this.lookAt(new THREE.Vector3(x, y, z))
  }

  lookAt = (x = 0, y = 0, z = 0) => {
    this.mesh.lookAt(x, y, z)
    this.mesh.rotation.x = 0
    this.mesh.rotation.z = 0
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
    this.triangle = mesh;
    return mesh
  }
}
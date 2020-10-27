import * as THREE from 'three';
import Common from './common';

export default class Arrow extends Common {
  constructor(props) {
    super(props);

    var triangleShape = new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(-.25, .5)
      .lineTo(.25, .5)
      .lineTo(0, 0);

    var extrudeSettings = { amount: .03, bevelEnabled: false };
    var geometry = new THREE.ExtrudeBufferGeometry(triangleShape, extrudeSettings);
    var material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = 0
    this.mesh.position.y = -.5
    this.mesh.position.z = 0
    this.mesh.rotation.x = THREE.MathUtils.degToRad(-90)
  }
}
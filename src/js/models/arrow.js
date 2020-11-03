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
    this.data = api.dataByid(this.id);
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

    let testMesh;
    if (false) {
      let testGeo = new THREE.SphereGeometry(.1, 32, 32)
      let testMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, });
      testMesh = new THREE.Mesh(testGeo, testMaterial)
      testMesh.name = 'testMesh';
      this.app.scene.add(testMesh)
    }

    const currentData = data.find(({ id }) => id === this.app.currentId);

    const unit_vec = this.app.getUnicVector(
      currentData.coords,
      _data.coords
    );



    const coefficient = 1;
    const newCoords = {
      x: unit_vec.x * coefficient,
      y: unit_vec.y * coefficient,
      z: unit_vec.z * coefficient,
    };

    if (testMesh) {
      testMesh.position.set(newCoords.x, newCoords.y, newCoords.z)
    }

    this.lookAt(new THREE.Vector3(
      newCoords.x,
      newCoords.y,
      newCoords.z
    ))
  }

  lookAt = (x = 0, y = 0, z = 0) => {
    this.mesh.lookAt(x, y, z)
    // this.mesh.rotation.x = 0
    // this.mesh.rotation.z = 0
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
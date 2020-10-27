import React from 'react';
import * as THREE from 'three';

export default class Main extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize, false);
    this.parent = document.getElementById('threejs')
    let { width, height } = this.parent.getBoundingClientRect();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    let geometry = new THREE.PlaneGeometry(5, 5)
    let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    let plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = THREE.MathUtils.degToRad(-90)
    plane.rotation.z = THREE.MathUtils.degToRad(-30)
    plane.position.y = -1;
    this.scene.add(plane)

    geometry = new THREE.SphereGeometry(1, 32, 32);
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
    this.camera.position.y = 2;
    this.camera.rotation.x = THREE.MathUtils.degToRad(-20)


    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.parent.appendChild(this.renderer.domElement);
    this.animate();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    let { width, height } = this.parent.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div className="page" id="threejs">

      </div>
    )
  }
}
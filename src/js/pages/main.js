import React from 'react';
import * as THREE from 'three';
import Models from '../models';

export default class Main extends React.Component {
  locations = []

  async componentDidMount() {
    window.addEventListener('resize', this.onWindowResize, false);
    this.parent = document.getElementById('threejs')
    let { width, height } = this.parent.getBoundingClientRect();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 0;
    this.renderer = new THREE.WebGLRenderer();

    this.sphere = new Models.Sphere()
    await this.sphere.init();
    this.scene.add(this.sphere.mesh);


    this.sphereOther = new Models.Sphere()
    await this.sphereOther.init();
    this.sphereOther.mesh.position.z = -10;
    this.scene.add(this.sphereOther.mesh);

    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.parent.appendChild(this.renderer.domElement);
    this.animate();

    this.locations.push(new Models.Location({ path: 'locations/pano_1.png' }))
    await this.locations[0].load()
    this.sphere.mesh.material.map = this.locations[0].texture;
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
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div className="page" id="threejs">

      </div>
    )
  }
}
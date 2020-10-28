import React from 'react';
import * as THREE from 'three';
import Models from '../models';

export default class Main extends React.Component {
  EVENTS = [
    { event: 'mousedown', handler: 'onMouseDown' },
    { event: 'mousemove', handler: 'onMouseMove' },
    { event: 'mouseup', handler: 'onMouseUp' },
    { event: 'resize', handler: 'onWindowResize' },
  ]
  cameraD = 600;

  locations = {}
  isMouseDown = false
  clientX;
  clientY;
  mouseDownLon;
  mouseDownLat;
  lon = 0;
  lat = 0;
  phi = 0;
  theta = 0;

  async componentDidMount() {
    this.initEvents();
    this.parent = document.getElementById('threejs')
    let { width, height } = this.parent.getBoundingClientRect();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.target = new THREE.Vector3(0, 0, 0);
    // this.camera.position.z = 1;
    this.light = new THREE.PointLight(0xffffff, 0.8);
    this.light.position.y = 10;
    this.light.position.z = 10;
    this.scene.add(this.light)
    this.renderer = new THREE.WebGLRenderer();

    this.sphere = new Models.Sphere({ app: this })
    await this.sphere.init();
    this.scene.add(this.sphere.mesh);


    this.sphereOther = new Models.Sphere({ app: this })
    await this.sphereOther.init();
    this.sphereOther.mesh.position.z = -10;
    this.scene.add(this.sphereOther.mesh);

    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.parent.appendChild(this.renderer.domElement);
    this.animate();

    let arrows = await this.sphere.changeTo(1);   
    console.log(arrows) 
  }

  componentWillUnmount() {
    this.removeEvents()
  }

  initEvents = () => {
    this.EVENTS.forEach(({ event, handler }) => window.addEventListener(event, this[handler]));
  }

  removeEvents = () => {
    this.EVENTS.forEach(({ event, handler }) => window.removeEventListener(event, this[handler]));
  }

  onMouseDown = ({ clientX, clientY }) => {
    this.isMouseDown = true
    this.clientX = clientX;
    this.clientY = clientY;
    this.mouseDownLon = this.lon;
    this.mouseDownLat = this.lat;
  }

  onMouseMove = ({ clientX, clientY }) => {
    if (this.isMouseDown) {
      this.lon = (this.clientX - clientX) * this.camera.fov / this.cameraD + this.mouseDownLon;
      this.lat = (clientY - this.clientY) * this.camera.fov / this.cameraD + this.mouseDownLat;
    }
  }

  onMouseUp = (event) => {
    this.isMouseDown = false
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
    // setTimeout(this.animate, 1000);
    requestAnimationFrame(this.animate);

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);

    this.camera.target.x = this.cameraD * Math.sin(this.phi) * Math.cos(this.theta);
    this.camera.target.y = this.cameraD * Math.cos(this.phi);
    this.camera.target.z = this.cameraD * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(this.camera.target);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return <div className="page" id="threejs" />
  }
}
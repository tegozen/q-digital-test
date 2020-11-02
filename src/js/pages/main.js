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
  mouse = new THREE.Vector2();
  lon = 0;
  lat = 0;
  phi = 0;
  theta = 0;
  arrows = [];

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
    this.raycaster = new THREE.Raycaster();

    this.sphere = new Models.Sphere({ app: this })
    await this.sphere.init();
    this.sphere.mesh.name = 'main'
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

    await this.sphere.changeTo(1);
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

  onMouseUp = ({ clientX, clientY }) => {
    let deltaX = Math.abs(clientX - this.clientX),
      deltaY = Math.abs(clientY - this.clientY);

    this.mouse = {
      x: (clientX / window.innerWidth) * 2 - 1,
      y: - (clientY / window.innerHeight) * 2 + 1
    };

    if (deltaX < 20 && deltaY < 20) {
      let arrow = this.detectClickByArrow();
      if (arrow) {
        
      }
    }

    this.clientX = undefined
    this.clientY = undefined
    this.isMouseDown = false
  }

  detectClickByArrow = () => {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects && intersects.length) {
      let main = intersects.find(({ object: { name } }) => name === 'main')
      if (main) {
        let distances = this.arrows.map((self) => {
          let { id, triangle } = self;
          let position = triangle.getWorldPosition();
          return { id, distance: main.point.distanceTo(position), self }
        })


        let { self } = distances.reduce((previousValue, currentValue) => {
          if (previousValue.distance < currentValue.distance) {
            return previousValue
          }
          else return currentValue
        })

        return self
      }
    }
    return false
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
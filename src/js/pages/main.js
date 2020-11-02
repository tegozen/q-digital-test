import React from 'react';
import * as THREE from 'three';
import Models from '../models';
import data from '../data'
import TWEEN from "@tweenjs/tween.js";

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
  radius = 10;
  currentId;

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
    await this.sphereOther.init(0);
    this.sphereOther.mesh.position.z = this.sphereOther.defaultPos;
    this.scene.add(this.sphereOther.mesh);

    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.parent.appendChild(this.renderer.domElement);
    requestAnimationFrame(this.animate);

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
        this.cameraToMarker(arrow)
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
          return { id, distance: main.point.distanceTo(position), self, position }
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

  getUnicVector(currentCoords, siblingCoords) {
    const vec = {
      x: (siblingCoords.x - currentCoords.x),
      y: (siblingCoords.y - currentCoords.y),
      z: (siblingCoords.z - currentCoords.z)
    }
    const len_vec = Math.sqrt(vec.x ** 2 + vec.y ** 2 + vec.z ** 2);
    return {
      x: vec.x / len_vec,
      y: vec.y / len_vec,
      z: vec.z / len_vec
    }
  }

  cameraToMarker = (arrow) => {
    const siblingData = data.find(({ id }) => id === arrow.id);

    const unit_vec = this.getUnicVector(
      { x: 0, y: 0, z: 0 },
      siblingData.coords
    );

    const coefficient = 1;
    const newCoords = {
      x: unit_vec.x * coefficient,
      y: unit_vec.y * coefficient,
      z: unit_vec.z * coefficient,
    };

    this.camera.target.x = newCoords.x;
    this.camera.target.y = 0;
    this.camera.target.z = newCoords.z

    this.radius = (Math.hypot(...Object.values(newCoords)))
    this.phi = Math.acos(newCoords.y / this.radius);
    this.theta = Math.atan2(newCoords.z, newCoords.x);
    this.lon = THREE.Math.radToDeg(this.theta);
    this.lat = 90 - THREE.Math.radToDeg(this.phi);

    this.sphereOther.changePosition(
      newCoords.x,
      newCoords.y,
      newCoords.z
    )

    this.sphereOther.changeTo(arrow.id, false)

    let settings = {
      x: this.sphereOther.mesh.position.x,
      y: this.sphereOther.mesh.position.y,
      z: this.sphereOther.mesh.position.z,
      opacityOther: 0,
      opacityMain: 1,
    };

    setTimeout(() => {

      this.arrows.forEach(arrow => {
        this.scene.remove(arrow.mesh)
      })

      this.arrows = []


      new TWEEN.Tween(settings)
        .to({
          x: this.sphere.mesh.position.x,
          y: this.sphere.mesh.position.y,
          z: this.sphere.mesh.position.z,
          opacityOther: 1,
          opacityMain: 0
        }, 2500)
        .onUpdate(() => {
          this.sphereOther.changeOpacity(settings.opacityOther)
          this.sphereOther.changePosition(
            settings.x,
            settings.y,
            settings.z
          );
          this.sphere.changeOpacity(settings.opacityMain)
        })
        .start()
        .onComplete(() => {
          this.sphereOther.reset()
          this.sphere.changeTo(arrow.id)
          this.sphere.changeOpacity(1)
        })
    }, 500);


  }

  onWindowResize = () => {
    let { width, height } = this.parent.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate = (time) => {
    TWEEN.update(time);
    requestAnimationFrame(this.animate);

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);

    this.camera.target.x = this.radius * Math.sin(this.phi) * Math.cos(this.theta);
    this.camera.target.y = this.radius * Math.cos(this.phi);
    this.camera.target.z = this.radius * Math.sin(this.phi) * Math.sin(this.theta);
    this.radius = (Math.hypot(...Object.values(this.camera.target)))

    this.camera.lookAt(this.camera.target);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return <div className="page" id="threejs" />
  }
}
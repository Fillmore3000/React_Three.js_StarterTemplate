import React from 'react';
import * as THREE from "three";
import {Component} from "react";
import './App.css';


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples//jsm/loaders/DRACOLoader.js';

class App extends Component{

  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
    var scene, camera, dirLight, stats;
			var renderer, mixer, controls;

			var clock = new THREE.Clock();
			var container = document.getElementById( 'container' );

			stats = new Stats();
			
			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.outputEncoding = THREE.sRGBEncoding;
			
			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xbfe3dd );

			camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
			camera.position.set( 5, 2, 8 );

			controls = new OrbitControls( camera, renderer.domElement );
			controls.target.set( 0, 0.5, 0 );
			controls.update();
			controls.enablePan = false;
			controls.enableDamping = true;

			scene.add( new THREE.HemisphereLight( 0xffffff, 0x000000, 0.4 ) );

			dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
			dirLight.position.set( 5, 2, 8 );
			scene.add( dirLight );

			// envmap
			var path = 'textures/cube/Park2/';
			var format = '.jpg';
			var envMap = new THREE.CubeTextureLoader().load( [
				path + 'posx' + format, path + 'negx' + format,
				path + 'posy' + format, path + 'negy' + format,
				path + 'posz' + format, path + 'negz' + format
			] );

			var dracoLoader = new DRACOLoader();
			dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );

			var loader = new GLTFLoader();
			loader.setDRACOLoader( dracoLoader );
			loader.load( 'models/gltf/LittlestTokyo.glb', function ( gltf ) {

				var model = gltf.scene;
				model.position.set( 1, 1, 0 );
				model.scale.set( 0.01, 0.01, 0.01 );
				model.traverse( function ( child ) {

					if ( child.isMesh ) child.material.envMap = envMap;

				} );

				scene.add( model );

				mixer = new THREE.AnimationMixer( model );
				mixer.clipAction( gltf.animations[ 0 ] ).play();

				animate();

			}, undefined, function ( e ) {

				console.error( e );

			} );


			window.onresize = function () {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			};


			function animate() {

				requestAnimationFrame( animate );

				var delta = clock.getDelta();

				mixer.update( delta );

				controls.update();

				stats.update();

				renderer.render( scene, camera );

			}
  }

  render() {
  return (
    <div ref={ref => (this.mount = ref)} />
  );
}
}

export default App;

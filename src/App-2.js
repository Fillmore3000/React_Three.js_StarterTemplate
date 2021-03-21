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
	var scene, camera,  dirLight, controls, stats;
	
	require('es6-promise').polyfill();
			const clock = new THREE.Clock();
			const container = document.getElementById( 'container' );

		 stats = new Stats();
			
		 container.appendChild( stats.dom );
			const renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.outputEncoding = THREE.sRGBEncoding;
			container.appendChild( renderer.domElement );
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
			

	// === THREE.JS EXAMPLE CODE END ===

	
	
	const loader = new GLTFLoader();
	const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

loader.load( './house/scene.glb', function ( gltf ) {
				

	scene.add( gltf.scene );

}, function ( xhr ) {

	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

	console.log( 'An error happened' );

}
);
  }

  render(){
  return (
	
    <div id="container">

<div id="info">
			<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - animation - keyframes<br/>
			Model: <a href="https://www.artstation.com/artwork/1AGwX" target="_blank" rel="noopener">Littlest Tokyo</a> by
			<a href="https://www.artstation.com/glenatron" target="_blank" rel="noopener">Glen Fox</a>, CC Attribution.
		</div>
	</div>
	
  );
}
}

export default App;

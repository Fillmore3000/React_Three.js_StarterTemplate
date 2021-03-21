
import * as THREE from "three";
import React, { Suspense, Component } from 'react';
import './App.css';


import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import Starpic from './star.png';
import Stats from 'three/examples/jsm/libs/stats.module.js';


class App extends Component{

  componentDidMount() {
    // === THREE.JS CODE START ===
	require('es6-promise').polyfill();
	// === THREE.JS EXAMPLE CODE END ===
	var scene, camera,  stats;
	
 stats = new Stats();
	
let  renderer, starGeo, stars, loader, sprite, starMaterial, star;


  init();
	animate( 0 );

	function init() {

		// scene

		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0x000000 );
		
		
		// camera

		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 1;
		camera.rotation.x = Math.PI/2;



// fonts
		

		// lights
		scene.add( new THREE.AmbientLight( 0x666666 ) );

		var light = new THREE.DirectionalLight( 0xdfebff, 1 );
		light.position.set( 50, 200, 100 );
		light.position.multiplyScalar( 1.3 );

		light.castShadow = true;

		light.shadow.mapSize.width = 1024;
		light.shadow.mapSize.height = 1024;

		var d = 300;

		light.shadow.camera.left = - d;
		light.shadow.camera.right = d;
		light.shadow.camera.top = d;
		light.shadow.camera.bottom = - d;

		light.shadow.camera.far = 1000;

		scene.add( light );

		var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( pointLight );
				scene.add( camera );


		renderer = new THREE.WebGLRenderer( );
			renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild(renderer.domElement);
	

		renderer.outputEncoding = THREE.sRGBEncoding;

		renderer.shadowMap.enabled = true;

		// controls
	
		// particles

		starGeo = new THREE.Geometry();
for( var i=0;i<6000;i++) {
   star = new THREE.Vector3(
    Math.random() * 600 - 300,
    Math.random() * 600 - 300,
    Math.random() * 600 - 300
  );
  star.velocity = 0;
  star.acceleration = 0.02;
  starGeo.vertices.push(star);
}
 sprite = new THREE.TextureLoader().load(Starpic);
console.log("Material-1 loaded");

starMaterial = new THREE.PointsMaterial({
	map: sprite,
	color: 0xaaaaaa,
  size: 0.7,
  
});
 stars = new THREE.Points(starGeo,starMaterial);
scene.add(stars);
		// performance monitor

		stats = new Stats();
		document.body.appendChild( stats.dom );

		//
		var mtlLoader = new MTLLoader();
		mtlLoader.load("./house/logo-NEW.mtl", materials => {
			materials.preload();
		console.log("Material loaded");
		//Load Object Now and Set Material
		var objLoader = new OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.load(
		  "./house/logo-NEW.obj",
		  object => {
			var logoMesh = object;
			logoMesh.position.set(-140,500,0);
			logoMesh.rotation.set(0.44,-1.55,-1.28); //or  this
			logoMesh.scale.set(7.02, 7.02,7.02);
			scene.add(logoMesh);
			
		  }
		);});
	

		var mtlLoader = new MTLLoader();
		mtlLoader.load("./house/materials.mtl", materials => {
			materials.preload();
		console.log("Material loaded");
		//Load Object Now and Set Material
		var objLoader = new OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.load(
		  "./house/model.obj",
		  object => {
			var shipMesh = object;
			shipMesh.position.set(-90,100,20);
			shipMesh.rotation.set(1.8,0.5,2.6); //or  this
			shipMesh.scale.set(10.02, 10.02,10.02);
			scene.add(shipMesh);
			
		  }
		);});
		
		var mtlLoader = new MTLLoader();
		mtlLoader.load("./house/materials-mars.mtl", materials => {
			materials.preload();
		console.log("Material loaded");
		//Load Object Now and Set Material
		var objLoader = new OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.load(
		  "./house/model-mars.obj",
		  object => {
			 marsMesh = object;
			marsMesh.position.set(0,360,-130);
			marsMesh.rotation.set(1.2,1.5,1.4); //or  this
			marsMesh.scale.set(1250.02, 1250.02, 1250.02);
			scene.add(marsMesh);
			
		  },
		  xhr => {
			console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
		  },
		  // called when loading has errors
		  error => {
			console.log("An error happened" + error);
		  }
		);});
		var marsMesh = new THREE.Mesh();
		
		var mainLoop = () => {
			requestAnimationFrame(mainLoop)
			renderer.render(scene, camera)
			
			marsMesh.rotation.x += Math.PI / 3600
			marsMesh.rotation.y += Math.PI / 3600
			marsMesh.rotation.z += Math.PI / 3600
			
			
			
		  }

		 
		  
		  mainLoop();

		window.addEventListener( 'resize', onWindowResize, false );

		//

		//

	

	}

	//

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	//

	function animate( now ) {
		
		starGeo.vertices.forEach(p => {
			p.velocity += p.acceleration
			p.y -= p.velocity;
			
			if (p.y < -200) {
			  p.y = 200;
			  p.velocity = 0;
			}
		  });
		  starGeo.verticesNeedUpdate = true;
		 stars.rotation.y +=0.002;
		 
	   
		requestAnimationFrame( animate );

	
		
		render();
		stats.update();


	}

	function render() {
		
		
		renderer.render( scene, camera,);

	}
}

	





  render(){
  return (
	
    <div id="container">

<div className="text-box">
      <div className="heading"></div>
      <div className="button-wrapper">
		
      </div>
    </div>
	</div>
	
  );
}
}

export default App;

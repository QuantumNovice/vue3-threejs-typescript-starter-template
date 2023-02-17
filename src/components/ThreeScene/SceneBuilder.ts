import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { toRaw } from 'vue';


export default class SceneBuilder{
    root: HTMLElement
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls
    material: THREE.MeshNormalMaterial
    directionalLight
   
    constructor(root: HTMLElement){
        this.root = root;
        this.scene = new THREE.Scene(),
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        
        this.renderer.setSize( 540, 640 );
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.scene.background = new THREE.Color( 0x5555555);
        this.cameraSetup();


        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.draw()
        this.root.appendChild( this.renderer.domElement );
    }

    cameraSetup (){
        
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        
        this.camera.position.set( -20, 10, 20 );
        this.camera.lookAt(0,0,0)
    }

    draw () {
        // LINE
        
        this.material = new THREE.LineBasicMaterial( { color: 0xffffff } );
 

        // GRID
        const gridHelper = new THREE.GridHelper( 500, 50 );
        this.scene.add( gridHelper );

        //AXES
        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );

        //LIGHTS
        var light = new THREE.Light(  0xFFFFFF, 10, 100 );
        light.position.set( 10, 10, 10 );
        this.scene.add( light );

        this.light = new THREE.AmbientLight( 0xaaaaaa)
        this.scene.add( this.light );
        

        //threejs create box
        let box = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        let cube = new THREE.Mesh( box, material );
        cube.position.set(0, -6, -6)
        this.scene.add( cube );
}


    render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render(toRaw(this.scene), this.camera)
        this.controls.update();

        
       
    }


}
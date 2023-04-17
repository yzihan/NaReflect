import * as THREE from 'three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    var width = window.innerWidth
    var height = window.innerHeight
    var canvasPixelWidth = canvas.width / window.devicePixelRatio
    var canvasPixelHeight = canvas.height / window.devicePixelRatio

    const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height
    if (needResize) {
        renderer.setSize(width, height, false)
    }
    return needResize
}

function init(){
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#eee')

    const canvas = document.querySelector('#three')
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 10

    const gltfLoader = new GLTFLoader()
    gltfLoader.load('/scene.gltf', (gltf)=>{
        let model = gltf.scene
        scene.add(model)
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

    })



    function animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate)

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix()
        }
    }
    animate()
}

export  {init}


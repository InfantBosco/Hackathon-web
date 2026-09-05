"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: {
      time: { type: string; value: number }
      resolution: { type: string; value: THREE.Vector2 }
    }
    animationId: number
    clock: THREE.Clock
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Ultra-optimized fragment shader tuned strictly to Red (#ff1e42), White (#ffffff), Grey (#94a3b8), and Deep Black (#000000)
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision mediump float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.28; // Majestic, slow wave motion
        float lineWidth = 0.0022;

        float intensity = 0.0;
        for(int i = 0; i < 5; i++){
          float fi = float(i);
          intensity += lineWidth * (fi * fi) / abs(fract(t + fi * 0.012) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.22));
        }

        // Color theme: Red (#ff1e42), White (#ffffff), Slate Grey (#94a3b8), Deep Black
        vec3 redColor = vec3(1.0, 0.12, 0.26);    // Crimson Red
        vec3 whiteColor = vec3(1.0, 1.0, 1.0);   // Pure White
        vec3 greyColor = vec3(0.58, 0.64, 0.72);  // Slate Grey

        vec3 color = redColor * intensity * 0.9 + whiteColor * pow(intensity, 1.6) * 0.4 + greyColor * intensity * 0.25;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Ultra-fast WebGL Renderer (disabled MSAA on background quad for 60fps zero-lag performance)
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    })
    
    // Capped pixel ratio (1.0 for mobile <768px, 1.25 for desktop) for 60fps zero-lag performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const pixelRatio = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25)
    renderer.setPixelRatio(pixelRatio)

    container.appendChild(renderer.domElement)

    // Clock for frame-rate independent smooth animation
    const clock = new THREE.Clock()

    // Handle window resize efficiently
    const onWindowResize = () => {
      if (!container || !renderer.domElement) return
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height, false)
      uniforms.resolution.value.set(width * pixelRatio, height * pixelRatio)
    }

    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Animation loop using delta time for stutter-free 60fps performance
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      uniforms.time.value += delta * 0.6
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
      clock,
    }

    animate()

    return () => {
      window.removeEventListener("resize", onWindowResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }

        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  )
}

"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: any
    animationId: number
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

    // Fragment shader tuned strictly to Red (#ff1e42), White (#ffffff), Grey (#94a3b8), and Black (#000000)
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.018; // Smooth, slower elegant motion
        float lineWidth = 0.0022;

        float intensity = 0.0;
        for(int i = 0; i < 5; i++){
          intensity += lineWidth * float(i * i) / abs(fract(t + float(i) * 0.012) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.22));
        }

        // Color theme: Red, White, Silver-Grey, Deep Black
        vec3 redColor = vec3(1.0, 0.12, 0.26);   // #ff1e42 Electric Crimson
        vec3 whiteColor = vec3(1.0, 1.0, 1.0);  // Pure White
        vec3 greyColor = vec3(0.58, 0.64, 0.72); // #94a3b8 Slate Silver Grey

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

    // Optimized WebGL Renderer for mobile & high performance
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    })
    
    // Cap pixel ratio at 1.5 for 60fps zero-lag performance on mobile devices
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    container.appendChild(renderer.domElement)

    // Handle window resize
    const onWindowResize = () => {
      if (!container || !renderer.domElement) return
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    // Initial resize
    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Animation loop with slower, smoother step (+0.018 per frame)
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.018
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    // Start animation
    animate()

    // Cleanup function
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
      className="w-full h-screen"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  )
}

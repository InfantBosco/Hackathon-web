import React, { useEffect, useRef } from 'react';

export interface NeuralNoiseProps {
  color?: [number, number, number];
  opacity?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const NeuralNoise: React.FC<NeuralNoiseProps> = ({
  color = [0.95, 0.15, 0.25], // Default Cyber Crimson Red: RGB normalized [0.95, 0.15, 0.25]
  opacity = 0.85,
  speed = 0.001,
  className,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const pointer = { x: 0, y: 0, tX: 0, tY: 0 };
    let gl: WebGLRenderingContext | null = null;
    let uniforms: Record<string, WebGLUniformLocation | null> = {};
    let animationFrameId: number;

    function createShader(glCtx: WebGLRenderingContext, source: string, type: number) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('Shader compile error:', glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(glCtx: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
      const program = glCtx.createProgram();
      if (!program) return null;
      glCtx.attachShader(program, vs);
      glCtx.attachShader(program, fs);
      glCtx.linkProgram(program);
      if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS)) {
        console.error('Program link error:', glCtx.getProgramInfoLog(program));
        return null;
      }
      return program;
    }

    function getUniforms(glCtx: WebGLRenderingContext, program: WebGLProgram) {
      const activeUniforms: Record<string, WebGLUniformLocation | null> = {};
      const uniformCount = glCtx.getProgramParameter(program, glCtx.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const info = glCtx.getActiveUniform(program, i);
        if (info) {
          activeUniforms[info.name] = glCtx.getUniformLocation(program, info.name);
        }
      }
      return activeUniforms;
    }

    function initShader() {
      const vsSource = `
        precision mediump float;
        varying vec2 vUv;
        attribute vec2 a_position;
        void main() {
          vUv = 0.5 * (a_position + 1.0);
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;
      const fsSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_ratio;
        uniform vec2 u_pointer_position;
        uniform vec3 u_color;
        uniform float u_speed;
        vec2 rotate(vec2 uv, float th) {
          return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
        }
        float neuro_shape(vec2 uv, float t, float p) {
          vec2 sine_acc = vec2(0.0);
          vec2 res = vec2(0.0);
          float scale = 8.0;
          for (int j = 0; j < 8; j++) {
            uv = rotate(uv, 1.0);
            sine_acc = rotate(sine_acc, 1.0);
            vec2 layer = uv * scale + float(j) + sine_acc - t;
            sine_acc += sin(layer) + 2.4 * p;
            res += (0.5 + 0.5 * cos(layer)) / scale;
            scale *= 1.2;
          }
          return res.x + res.y;
        }
        void main() {
          vec2 uv = 0.5 * vUv;
          uv.x *= u_ratio;
          vec2 pointer = vUv - u_pointer_position;
          pointer.x *= u_ratio;
          float p = clamp(length(pointer), 0.0, 1.0);
          p = 0.5 * pow(1.0 - p, 2.0);
          float t = u_speed * u_time;
          vec3 col = vec3(0.0);
          float noise = neuro_shape(uv, t, p);
          noise = 1.2 * pow(noise, 3.0);
          noise += pow(noise, 10.0);
          noise = max(0.0, noise - 0.5);
          noise *= (1.0 - length(vUv - 0.5));
          col = u_color * noise;
          gl_FragColor = vec4(col, noise);
        }
      `;

      if (!canvasEl) return null;
      gl = (canvasEl.getContext('webgl') || canvasEl.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      if (!gl) {
        console.error('WebGL not supported');
        return null;
      }

      const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
      const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
      if (!vertexShader || !fragmentShader) return null;

      const shaderProgram = createProgram(gl, vertexShader, fragmentShader);
      if (!shaderProgram) return null;

      uniforms = getUniforms(gl, shaderProgram);
      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.useProgram(shaderProgram);
      const positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      return gl;
    }

    function resizeCanvas() {
      if (!canvasEl || !gl) return;
      // Cap pixel ratio at 1.0 for mobile devices (<768px) and 1.25 for desktop for 60fps zero-lag execution
      const isMobile = window.innerWidth < 768;
      const devicePixelRatio = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25);
      canvasEl.width = window.innerWidth * devicePixelRatio;
      canvasEl.height = window.innerHeight * devicePixelRatio;
      if (uniforms && uniforms.u_ratio) {
        gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
      }
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
    }

    function render() {
      if (!gl) return;
      const currentTime = performance.now();
      pointer.x += (pointer.tX - pointer.x) * 0.2;
      pointer.y += (pointer.tY - pointer.y) * 0.2;
      if (uniforms.u_time) gl.uniform1f(uniforms.u_time, currentTime);
      if (uniforms.u_pointer_position) {
        gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    function setupEvents() {
      const updateMousePosition = (x: number, y: number) => {
        pointer.tX = x;
        pointer.tY = y;
      };
      const pointermove = (e: PointerEvent) => updateMousePosition(e.clientX, e.clientY);
      const touchmove = (e: TouchEvent) => {
        if (e.targetTouches[0]) updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
      };
      const click = (e: MouseEvent) => updateMousePosition(e.clientX, e.clientY);

      window.addEventListener('pointermove', pointermove);
      window.addEventListener('touchmove', touchmove);
      window.addEventListener('click', click);

      return () => {
        window.removeEventListener('pointermove', pointermove);
        window.removeEventListener('touchmove', touchmove);
        window.removeEventListener('click', click);
      };
    }

    gl = initShader();
    if (!gl) return;
    const cleanupEvents = setupEvents();
    resizeCanvas();
    const resizeListener = () => resizeCanvas();
    window.addEventListener('resize', resizeListener);

    if (uniforms.u_color) gl.uniform3f(uniforms.u_color, color[0], color[1], color[2]);
    if (uniforms.u_speed) gl.uniform1f(uniforms.u_speed, speed);

    render();

    return () => {
      window.removeEventListener('resize', resizeListener);
      cleanupEvents();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        ...style,
      }}
    />
  );
};

export default NeuralNoise;

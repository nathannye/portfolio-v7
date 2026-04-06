uniform sampler2D uTexture;

varying vec2 vUv;
varying float vFacing;

void main() {
  vec4 color = texture2D(uTexture, vUv);

  float edge = smoothstep(0.0, 0.12, vFacing);

  gl_FragColor = vec4(color.rgb, color.a * edge);
}

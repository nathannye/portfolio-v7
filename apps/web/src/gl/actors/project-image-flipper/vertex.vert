uniform float uProgress;

varying vec2 vUv;
varying float vFacing;

void main() {
  vUv = uv;

  float flip = (1.0 - uProgress) * 3.14159265;
  // Strongest mid-transition so the sheet is flat at rest (in or out)
  float twistEnvelope = sin(uProgress * 3.14159265);

  // Twist angle varies with height → true barber-pole / propeller deformation
  float h = position.y * 1.0;
  float twistRad = twistEnvelope * 2.85 * h;
  float dTwistDy = twistEnvelope * 5.7;

  float ct = cos(twistRad);
  float st = sin(twistRad);
  vec3 pos = position;
  float px = pos.x * ct - pos.z * st;
  float pz = pos.x * st + pos.z * ct;
  pos.x = px;
  pos.z = pz;

  float cf = cos(flip);
  float sf = sin(flip);
  float qx = pos.x * cf - pos.z * sf;
  float qz = pos.x * sf + pos.z * cf;
  pos.x = qx;
  pos.z = qz;

  // Analytic normal of twisted plane (param x,y), then same flip as geometry
  vec3 geomN = vec3(-st, -position.x * dTwistDy, ct);
  geomN = normalize(geomN);

  float nx = geomN.x * cf - geomN.z * sf;
  float nz = geomN.x * sf + geomN.z * cf;
  geomN.x = nx;
  geomN.z = nz;

  vFacing = max(0.0, normalize(normalMatrix * geomN).z);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

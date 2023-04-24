const fragmentShaderSnorlax = `

uniform sampler2D uMap;

varying vec2 vUv;
varying float vDiff;

void main() {
	gl_FragColor = texture2D(uMap, vUv);
}`
export default fragmentShaderSnorlax;
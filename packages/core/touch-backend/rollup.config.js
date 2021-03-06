import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'

export default {
	input: path.resolve(__dirname, 'dist/esm/index.js'),
	output: [
		{
			name: 'ReactDnDTouchBackend',
			file: path.resolve(__dirname, 'dist/umd/ReactDnDTouchBackend.js'),
			format: 'umd',
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM',
				'react-dnd': 'ReactDnD',
			},
			plugins: [
				replace({
					values: { 'process.env.NODE_ENV': JSON.stringify('development') },
					delimiters: ['', ''],
				}),
			],
		},
		{
			name: 'ReactDnDTouchBackend',
			file: path.resolve(__dirname, 'dist/umd/ReactDnDTouchBackend.min.js'),
			format: 'umd',
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM',
				'react-dnd': 'ReactDnD',
			},
			plugins: [
				terser(),
				replace({
					values: { 'process.env.NODE_ENV': JSON.stringify('production') },
					delimiters: ['', ''],
				}),
			],
		},
	],
	external: ['react', 'react-dom', 'react-dnd'],
	plugins: [resolve({ browser: true }), commonjs()],
}

import typescript from '@rollup/plugin-typescript';

export default [

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.ts',
        plugins: [
          typescript({tsconfig: './tsconfig.json'}),
        ],
		external: ['ms'],
		output: [
			{ file: 'dist/index.cjs.js', format: 'cjs' },
			{ file: 'dist/index.es.js', format: 'es' }
		],
	}
];

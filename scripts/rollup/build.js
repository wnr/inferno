const fs = require('fs');
const { join } = require('path');
const { rollup } = require('rollup');

const aliasPlugin = require('./plugins/alias');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const bublePlugin = require('rollup-plugin-buble');
const tsPlugin = require('rollup-plugin-typescript2');
const replace = require('rollup-plugin-replace');

const cwd = process.cwd();

const tsConfig = require(join(__dirname, '../../', 'tsconfig.json'));
const pkgJSON  = require(join(cwd, 'package.json'));

if (pkgJSON.private || !pkgJSON.rollup) {
	return;
}

const rollupConfig = pkgJSON.rollup;

console.log(`
==============================
	COMPILING ${process.cwd()}
===============================
`);

function createBundle(fileName, format) {
	return {
		dest: 'dist/' + fileName + '.js',
		exports: 'named',
		format: format,
		globals: {
			'inferno-shared': 'Inferno.Shared',
		},
		moduleName: rollupConfig.moduleName || pkgJSON.name,
		sourceMap: false
	};
}

return rollup({
	entry: join(cwd, 'src/index.ts'),
	external: rollupConfig.bundledDependencies,
	plugins: [
		aliasPlugin,
		nodeResolve({
			extensions: [ '.ts', '.js', '.json' ],
			jsnext: true,
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		replace({
			VERSION: pkgJSON.version,
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
		}),
		tsPlugin({
			abortOnError: false,
			check: false,
			clean: true,
			exclude: [
				'*.d.ts',
				'**/*.d.ts',
				'*.spec*',
				'**/*.spec*',
			]
		}),
		bublePlugin(),
	],
}).then((bundle) => {
	try {
		fs.mkdirSync(join(cwd, 'dist'));
	} catch (e) {
		if (e.code !== 'EEXIST') {
			throw Error(e);
		}
	}

	bundle.write(createBundle('index.es', 'cjs'));
	bundle.write(createBundle('index', 'es'));
	bundle.write(createBundle(rollupConfig.moduleName || pkgJSON.name, 'umd'));
}).catch((err) => {
	console.error(err);
});

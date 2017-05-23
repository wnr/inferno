const { resolve, join } = require('path');
const alias = require('rollup-plugin-alias');

const ROOT = join(__dirname, '../../../');

module.exports = alias({
	inferno: resolve(ROOT, 'packages/inferno/dist/index.js'),
	'inferno-compat': resolve(ROOT, 'packages/inferno-compat/dist/index.js'),
	'inferno-component': resolve(ROOT, 'packages/inferno-component/dist/index.js'),
	'inferno-create-class': resolve(ROOT, 'packages/inferno-create-class/dist/index.js'),
	'inferno-create-element': resolve(ROOT, 'packages/inferno-create-element/dist/index.js'),
	'inferno-hyperscript': resolve(ROOT, 'packages/inferno-hyperscript/dist/index.js'),
	'inferno-mobx': resolve(ROOT, 'packages/inferno-mobx/dist/index.js'),
	'inferno-redux': resolve(ROOT, 'packages/inferno-redux/dist/index.js'),
	'inferno-router': resolve(ROOT, 'packages/inferno-router/dist/index.js'),
	'inferno-server': resolve(ROOT, 'packages/inferno-server/dist/index.js'),
	'inferno-shared': resolve(ROOT, 'packages/inferno-shared/dist/index.js'),
});

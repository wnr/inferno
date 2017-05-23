const { resolve } = require('path');
const alias = require('rollup-plugin-alias');

module.exports = alias({
	inferno: resolve(__dirname, '../packages/inferno/dist/index.js'),
	'inferno-compat': resolve(__dirname, '../packages/inferno-compat/dist/index.js'),
	'inferno-component': resolve(__dirname, '../packages/inferno-component/dist/index.js'),
	'inferno-create-class': resolve(__dirname, '../packages/inferno-create-class/dist/index.js'),
	'inferno-create-element': resolve(__dirname, '../packages/inferno-create-element/dist/index.js'),
	'inferno-hyperscript': resolve(__dirname, '../packages/inferno-hyperscript/dist/index.js'),
	'inferno-mobx': resolve(__dirname, '../packages/inferno-mobx/dist/index.js'),
	'inferno-redux': resolve(__dirname, '../packages/inferno-redux/dist/index.js'),
	'inferno-router': resolve(__dirname, '../packages/inferno-router/dist/index.js'),
	'inferno-server': resolve(__dirname, '../packages/inferno-server/dist/index.js'),
	'inferno-shared': resolve(__dirname, '../packages/inferno-shared/dist/index.js'),
});

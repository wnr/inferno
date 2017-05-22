module.exports = {
	'collectCoverageFrom': [
		'packages/*/src/**/*.ts',
		'!**/*.ts.js'
	],
	'coverageReporters': [
		'html',
		'lcov',
		'text'
	],
	'moduleFileExtensions': [
		'ts',
		'tsx',
		'js',
		'jsx',
		'json'
	],
	'moduleNameMapper': {
		'^inferno$': '<rootDir>/packages/inferno/src',
		'^inferno-component$': '<rootDir>/packages/inferno-component/src',
		'^inferno-create-class$': '<rootDir>/packages/inferno-create-class/src',
		'^inferno-create-element$': '<rootDir>/packages/inferno-create-element/src',
		'^inferno-shared$': '<rootDir>/packages/inferno-shared/src',
		'^inferno-test-utils$': '<rootDir>/packages/inferno-test-utils/src',
		'^inferno-utils$': '<rootDir>/packages/inferno-utils/src',
		'^inferno-vnode-flags$': '<rootDir>/packages/inferno-vnode-flags/src'
	},
	'projects': [
		'<rootDir>/packages/inferno',
		'<rootDir>/packages/inferno-component',
		'<rootDir>/packages/inferno-create-class',
		'<rootDir>/packages/inferno-create-element',
		'<rootDir>/packages/inferno-shared',
		'<rootDir>/packages/inferno-vnode-flags'
	],
	'testMatch': [
		'**/packages/*/tests/**/*.spec.js?(x)',
		'**/packages/*/tests/**/*.spec.ts?(x)'
	],
	'transform': {
		'.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
	}
};

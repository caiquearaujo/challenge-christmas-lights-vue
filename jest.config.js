module.exports = {
	verbose: true,
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	collectCoverage: true,
	coverageThreshold: {
		global: {
			branches: 60,
			functions: 60,
			lines: 60,
			statements: 60,
		},
	},
	coveragePathIgnorePatterns: ['./node_modules/', './test/'],
	coverageReporters: ['json-summary', 'text', 'lcov'],
	testMatch: ['**/tests/*spec.+(ts)', '**/tests/**/*spec.+(ts)'],
	moduleFileExtensions: ['ts', 'vue', 'js'],
};

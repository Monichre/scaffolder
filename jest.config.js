module.exports = {
	'verbose': true,
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest'
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
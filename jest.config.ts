/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  moduleFileExtensions: ["ts", "js"],
  transform: {},
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/src/__tests__/*.test.ts"],
  verbose: true,
  /* forceExit: true, */
  /* clearMocks: true, */
}
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/setupFilesAfterEnv.ts"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  setupFiles: ["<rootDir>/jest.env.js"],
};

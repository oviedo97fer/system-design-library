module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  types: ["jest"],
  testMatch: ["**/__tests__/**/*.test.tsx"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      isolatedModules: true,
      esModuleInterop: true, // Habilitar módulos de ECMAScript
    },
  },
};

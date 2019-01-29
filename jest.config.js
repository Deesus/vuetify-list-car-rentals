module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.(js|vue)"],
    coveragePathIgnorePatterns: ["src/plugins"],
    coverageReporters: ["html"],
    testMatch: [
        '**/tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],
    testURL: 'http://localhost/'
};

export default {
  preset: "ts-jest",
  // match only files with .test.ts or .spec.ts extension
  testRegex: "\\.(test|spec)\\.ts$",
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
};

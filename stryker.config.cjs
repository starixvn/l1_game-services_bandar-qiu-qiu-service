module.exports = {
    $schema: "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
    _comment:
        "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
    packageManager: "yarn",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "jest",
    testRunner_comment: "Take a look at (missing 'homepage' URL in package.json) for information about the jest plugin.",
    coverageAnalysis: "off",
    testRunnerNodeArgs: ["--experimental-vm-modules"],
    concurrency: 4,
    tempDirName: "stryker-tmp",
    jest: {
        projectType: "custom",
        configFile: "jest.config.cjs",
        enableFindRelatedTests: false,
    },
    mutator: "javascript",
    disableTypeChecks: "Scripts/app/**/*.{js,ts,jsx,tsx,html,vue}",
    ignorePatterns: ["dist", "coverage"],
};

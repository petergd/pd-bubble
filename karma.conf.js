const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();
module.exports = function(config) {
  config.set({
    basePath: "",
    urlRoot: "/pd-bubble/",
    baseURL: "http://10.10.10.5:9876/",
    frameworks: ["jasmine","chai"],
    files: [
        { pattern: "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js", included: false },
        { pattern: "fonts/*", watched: false, included: false, served: true, nocache: false },
        { pattern: "tests/*.html", watched:false, served:true, included:false },
        { pattern: "tests/*.test.js", watched:true, type: "module", included: true },
        { pattern: "test-utils.js", type: "module", included: false },
        { pattern: "pd-bubble.js", type: "module", included: false }
    ],
    client: {
      jasmine: {
        random: false
      }
    },
    exclude: [],
    preprocessors: {},
    reporters: ["spec"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
	processKillTimeout: 1000,
	browserSocketTimeout: 10000,
	captureTimeout: 30000,
    autoWatch: true,
    browsers: ["Firefox","ChromeHeadless"],
    singleRun: false,
    concurrency: 1
  });
};
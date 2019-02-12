// var fs = require("fs");
var CLIEngine = require("eslint").CLIEngine;

console.log(4444);

var cli = new CLIEngine({
    envs: ["browser", "mocha"],
    fix: true, // difference from last example
    useEslintrc: false,
    extends: [
	    'plugin:vue/essential', 
	    'standard'
	  ],
    rules: {
        semi: 2,
        "indent": [2, 4]
    }
});

// lint myfile.js and all files in lib/
var report = cli.executeOnFiles(["js1.js"]);
console.log(report.results[0].output);
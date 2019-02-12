var stylelint = require('stylelint');


// var child_process = require('child_process');

var vv = child_process.execFile('node-sass nav2.scss nav2.css');
var vv = child_process.execSync("stylelint './style.css' --fix");
console.log(vv);


// stylelint.lint({
//   config: { 
//   "extends": "stylelint-config-standard", 
//   "fixed":
//   // "plugins": ["stylelint-order"],
//   "rules": {  
//     "no-empty-source": null,
//     "property-no-vendor-prefix": [true, {"ignoreProperties": ["background-clip"]}],
//     "number-leading-zero": "never",
//     "number-no-trailing-zeros": true,
//     "length-zero-no-unit": true,
//     "value-list-comma-space-after": "always",
//     "declaration-colon-space-after": "always",
//     "value-list-max-empty-lines": 0,
//     "shorthand-property-no-redundant-values": true,
//     "declaration-block-no-duplicate-properties": true,
//     "declaration-block-no-redundant-longhand-properties": true,
//     "declaration-block-semicolon-newline-after": "always",
//     "block-closing-brace-newline-after": "always",
//     "media-feature-colon-space-after": "always",
//     "media-feature-range-operator-space-after": "always",
//     "at-rule-name-space-after": "always",
//     "indentation": 2,
//     "no-eol-whitespace": true,
//     "string-no-newline": null
//   }
// },
//   files: "style.css"
// })
//   .then(function(data) {
//   	console.log(1111111111);
//   	console.log(data.output);
//     // do things with data.output, data.errored,
//     // and data.results
//   })
//   .catch(function(err) {
//     // do things with err e.g.
//     console.log(222222222);
//     console.error(err.stack);
//   });;
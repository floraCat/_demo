var Linter = require("eslint").Linter;
var linter = new Linter();

var messages = linter.verifyAndFix("var foo", {
    rules: {
        semi: 2
    }
});
console.log(messages.output)
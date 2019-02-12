var Linter = require("eslint").Linter;
var linter = new Linter();

var _code = '{"cats":[{"ttl":"分类1","href":"#","src":"http://localhost:8000/imgs/11.jpg"},{"ttl":"分类2","href":"#","src":"http://localhost:8000/imgs/11.jpg"},{"ttl":"分类3","href":"#","src":"http://localhost:8000/imgs/11.jpg"},{"ttl":"分类4","href":"#","src":"http://localhost:8000/imgs/11.jpg"},{"ttl":"分类5","href":"#","src":"http://localhost:8000/imgs/11.jpg"},{"ttl":"分类6","href":"#","src":"http://localhost:8000/imgs/11.jpg"}]}';
var messages = linter.verifyAndFix(_code, {
    rules: {
        semi: 2
    }
});
console.log(messages.output)
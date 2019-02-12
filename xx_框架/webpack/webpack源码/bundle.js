        webpackJsonp([1],[
            /* 0 */
            (function(module, exports, __webpack_require__) {
                module.exports = __webpack_require__.p + "695368065150e6c5683c6642951c74ce.jpg";
            }),
            /* 1 */
            (function(module, __webpack_exports__, __webpack_require__) {
                "use strict";
                Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
                // 加载依赖模块
                var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(2);
                ...
                var __WEBPACK_IMPORTED_MODULE_1__katong_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__katong_jpg__);
                ...
                var __WEBPACK_IMPORTED_MODULE_2__say_js__ = __webpack_require__(7);
                // welcome.js文件里的代码
                var elDiv1 = document.createElement('div');
                ...
                // 把原来的url替换成了上面加载的图片
                elImg.src = __WEBPACK_IMPORTED_MODULE_1__katong_jpg___default.a;
                ...
                // 把import替换成用promise实现的__webpack_require__.e()来完成异步按需加载
                btn.onclick = function() {
                    __webpack_require__.e(0).then(__webpack_require__.bind(null, 8)).then(m => {
                        m.default();
                    });
                };
                // 把原来的say()函数替换成上面加载的函数
                Object(__WEBPACK_IMPORTED_MODULE_2__say_js__["a"])();
            }),
            /* 2 */
            (function(module, exports, __webpack_require__) {
                ...
            }),
            ...
            /* 6 */
            (function(module, exports) {
                ...
            }),
            /* 7 */
            (function(module, __webpack_exports__, __webpack_require__) {
                // 模块输出
                __webpack_exports__["a"] = printMe;
                function printMe() {
                    ...
                }
            })
        ],[1]);

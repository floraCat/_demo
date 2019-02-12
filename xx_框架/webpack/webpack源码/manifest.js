        (function(modules) { // webpackBootstrap
            // modules存储的是模块函数
            // The module cache，存储的是模块对象
            var installedModules = {};
            // objects to store loaded and loading chunks
            // 按需加载的模块的promise
            var installedChunks = { 2:0 };
            // The require function
            // require的功能是把modules对象里的模块函数转化成模块对象，
            // 即运行模块函数，模块函数会把模块的export赋值给模块对象，供其他模块调用。
            function __webpack_require__(moduleId) {
                // Check if module is in cache
                if(installedModules[moduleId]) {
                    return installedModules[moduleId].exports;
                }
                // 下面开始把一个模块的代码转化成一个模块对象
                // Create a new module (and put it into the cache)
                var module = installedModules[moduleId] = {
                    i: moduleId,
                    l: false, //是否已经加载完成
                    exports: {} //模块输出，几乎代表模块本身
                };
                // Execute the module function,即运行模块函数，打包后的每个模块都是一个函数
                modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                // Flag the module as loaded
                module.l = true;
                // Return the exports of the module
                return module.exports;
            }
            // install a JSONP callback for chunk loading
            var parentJsonpFunction = window["webpackJsonp"];
            window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
                var moduleId, chunkId, i = 0, resolves = [], result;
                // 遍历chunkIds，如果对应的模块是按需加载的模块，就把其resolve函数存起来。
                for(;i < chunkIds.length; i++) {
                    chunkId = chunkIds[i];
                    if(installedChunks[chunkId]) {
                        // 是按需加载的模块，取出其resolve函数
                        resolves.push(installedChunks[chunkId][0]);
                    }
                    installedChunks[chunkId] = 0; //该chunk已经被处理了
                }
                //遍历moreModules把模块函数存到modules中
                for(moduleId in moreModules) {
                    if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                        modules[moduleId] = moreModules[moduleId];
                    }
                }
                // 执行resolve函数，一般是__webpack_require__函数
                while(resolves.length) {
                    resolves.shift()();
                }
                //遍历moreModules把模块函数转化成模块对象
                if(executeModules) {
                    for(i=0; i < executeModules.length; i++) {
                        result = __webpack_require__(__webpack_require__.s = executeModules[i]);
                    }
                }
                return result;
            };
            __webpack_require__.e = function requireEnsure(chunkId) {
                var installedChunkData = installedChunks[chunkId];
                // 模块已经被处理过（加载了模块函数并转换成了模块对象），就返回promise，调用resolve
                if(installedChunkData === 0) {
                    return new Promise(function(resolve) { resolve(); });
                }
                // 模块正在被加载，返回原来的promise
                // 加载完后会运行模块函数，模块函数会调用resolve改变promise的状态
                if(installedChunkData) {
                    return installedChunkData[2];
                }
                // 新建promise，并把resolve，reject函数和promise都赋值给installedChunks[chunkId]，以便全局访问
                var promise = new Promise(function(resolve, reject) {
                    installedChunkData = installedChunks[chunkId] = [resolve, reject];
                });
                installedChunkData[2] = promise;
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
                var timeout = setTimeout(onScriptComplete, 120000);
                script.onerror = script.onload = onScriptComplete;
                function onScriptComplete() {
                    script.onerror = script.onload = null;
                    clearTimeout(timeout);
                    var chunk = installedChunks[chunkId];
                    if(chunk !== 0) { //没有被处理
                        if(chunk) {// 是按需加载模块，即请求超时了
                            chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
                        }
                        installedChunks[chunkId] = undefined;
                    }
                }
            }
        })([]);
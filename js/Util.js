/**
 * @class Util
 * @namespace tui
 * @singleton Contains some useful operations
 */
tui.Util = function () {
    return {
        proxy: function (fn, context) {
            var proxy;
            if (!tui.Util.isFunction(fn)) {
                return undefined;
            }
            proxy = function () {
                return fn.apply(context || this, arguments);
            };
            return proxy;
        },

        isFunction: function (fn) {
            var getType = {};
            return fn && getType.toString.call(fn) === '[object Function]';
        },

        apply: function (destObj, sourceObj) {
            if (destObj && sourceObj && typeof sourceObj === 'object') {
                for (var p in sourceObj) {
                    if (sourceObj[p] !== undefined && sourceObj[p] !== null) {
                        destObj[p] = sourceObj[p];
                    }
                }
            }
            return destObj;
        }
    };
}();
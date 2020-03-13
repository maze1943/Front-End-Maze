(function (window) {
    const Promise = function (excutor) {
        const that = this;
        //初始化promise状态为pending
        this.status = "pending";
        //存储执行器返回数据
        this.data = undefined;
        //存储回调{onresolve,onreject}列表
        this.callbacks = [];

        //执行器参数，修改状态为resolved，异步调用成功回调
        function resolve(value) {
            if (this.status != "pending") return;
            that.status = "resolved";
            if (that.callbacks.length > 0) {
                //异步执行回调
                setTimeout(() => {
                    that.callbacks.forEach(callback => {
                        callback.onresolved(value);
                    });
                }, 0);
            }
        }
        //执行器参数，修改状态为rejeted，异步调用失败回调
        function reject(reason) {
            if (this.status != "pending") return;
            that.status = "rejected";
            if (that.callbacks.length > 0) {
                //异步执行回调
                setTimeout(() => {
                    that.callbacks.forEach(callback => {
                        callback.onrejected(reason);
                    });
                }, 0);
            }
        }
        //同步执行执行器函数
        excutor(resolve, reject);
    }

    //同步指定回调函数，promise状态改变之后异步执行回调
    Promise.prototype.then = function (onresolved, onrejected) {
        this.callbacks.push({
            'onresolved': onresolved,
            'onrejected': onrejected
        });

    }
    //同步指定失败回调，promise失败之后异步执行回调
    Promise.prototype.catch = function (onrejected) {

    }
    Promise.resolve = function () {

    }
    Promise.reject = function () {

    }
    Promise.all = function () {

    }
    Promise.race = function () {

    }

    //将Promise暴露至全局变量
    window.Promise = Promise;
})(window)
(function (window) {
    // 1.定义Promise构造函数
    // 2.Promise.then


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
            if (that.status != "pending") return;
            that.status = "resolved";
            that.data = value;
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
            if (that.status != "pending") return;
            that.status = "rejected";
            that.data = reason;
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
        var that = this;
        return new Promise((resolve, reject) => {
            if (that.status === "resolved") {
                try {
                    onresolved = typeof (onresolved) === 'function' ? onresolved : function () { };
                    let result = onresolved();
                    if (result instanceof Promise) {
                        result.then((value)=>{

                        },(reason)=>{
                            
                        });
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            } else if (that.status === "rejected") {
                try {
                    onrejected = typeof (onrejected) === 'function' ? onrejected : function () { };
                    let result = onrejected();
                    if (result instanceof Promise) {
                        result.then((value)=>{

                        },(reason)=>{

                        });
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                that.callbacks.push({
                    'onresolved': onresolved,
                    'onrejected': onrejected
                });
            }
        })
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
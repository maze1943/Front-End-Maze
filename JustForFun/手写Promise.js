(function(window){
    const Promise = function(excutor){
        //同步执行
        excutor();
    }

    Promise.prototype.then
    Promise.prototype.catch
    Promise.resolve
    Promise.reject
    Promise.all
    Promise.race

    //将Promise暴露至全局变量
    window.Promise = Promise;
})(window)
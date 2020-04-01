指令（directive）是AngularJS的四个核心特性之一：
1. MVC
2. 模块化
3. 双向数据绑定
4. 指令系统

## 指令的三个阶段

AngularJS的指令生效会经过三个阶段：
1. 启动阶段 AngularJS加载完成后会找到ng-app以确定应用的边界
2. 编译阶段（compile）AngularJS会遍历dom，找到所有指令；然后根据指令中的temlate、replace、transclude转换dom结构；如果存在自定义的compile则调用（一般情况不需要自定义compile，如果存在自定义compile，link将失效）
3. 链接阶段（link）链接阶段对指令中的link函数调用，完成作用域和dom之间数据的绑定，以及dom 事件监听器的注册：

```javascript
    link : function(scope, element, attrs, ctr){
        ...
    }
```

**link与controller之间的区别：**
1、执行顺序：先controller后link，controller是在预编译阶段执行的
2、何时使用controller：一般场景下都不需要使用controller，只需要把逻辑写在link中就可以了；用controller的场景就是该指令（假设为a）会被其他指令（假设为b）require的时候，这样就会在b指令的link函数中传入这个controller（如果require多个的话，传入的是一个数组，数组中存放的是每一个require的指令对应的controller），目的很显然是为了指令间进行交流的。link一般执行指令内部的逻辑。

## 定义一个指令

```javascript
app.directive("myDirective",function(){
    return {
        scope:{},//指定指令的作用域
        restrict:'AEMC',//A：attribute属性；E：element元素；M：注释；C：class样式类
        require:'^otherDirective',//依赖于otherDirective
        controller:function(scope, element, attrs){
            this.someFunction = function(){}
        },//可以暴露给其他指令调用
        link:function(scope, element, attrs, ctr){},//执行指令内部逻辑，操作dom
        templateUrl:'myTemplate.html'，
        replace: boolean,//是否用模板替换当前元素，若为false，则append在当前元素上
        transclude: boolean,//是否将当前元素的内容替换到模板中，模版中需要ng-transclude
    }
})
```
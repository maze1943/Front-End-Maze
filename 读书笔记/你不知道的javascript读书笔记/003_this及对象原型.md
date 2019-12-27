# this及对象原型
#### 读书笔记----来自《你不知道的javascript》（上卷）第二部分this及对象原型

### this的实质理解

按照惯例我们先对this做一些定义性质的描述：
this是在运行时而非编写时绑定的，它的上下文取决于函数调用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。即：**this指向，完全取决于函数在哪里被调用。**
当一个函数被调用时，会创建其执行上下文，包含了函数在哪里被调用（调用栈），调用方式，函数传参等信息。this就是这个执行上下文的一个属性。**this并不是指向函数其自身、或者函数自身的作用域（this经常被误解的两个含义）！**

首先需要理解什么是调用栈和调用位置：

this的四条绑定规则:
默认绑定；
```javascript
function foo(){
    //需要注意的是，严格模式下是不允许默认绑定到全局对象的，会绑定到undefied
    console.log(this);
}
foo();//输出window
```
隐式绑定；
如果函数的调用位置存在上下文对象，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。
```javascript
function foo(){
    console.log(this.a);
}
var obj = {
    a : "a of obj",
    foo : foo;
}
obj.foo();//输出a of obj
```
下例中，函数的this并没有被饮隐式绑定到obj上，而是应用了默认绑定。因为bar虽然是引用了obj.foo，但本质上bar引用的是foo本身，此时此刻它是一个不带任何修饰的函数调用，因此应用了默认绑定。
```javascript
//this的隐式绑定丢失
function foo(){
    console.log(this.a);
}
var obj = {
    a:"a of obj",
    foo:foo
}
var bar = obj.foo;//函数别名
window.a = "oops,global";
bar();//输出oops,global
```

下面这个例子和上例本质上一样，传入回调函数其实就是一种隐式赋值
```javascript
function foo(){
    console.log(this.a);
}
var obj = {
    a:"a of obj",
    foo:foo
}
function FOO(fn){
    //此处其实是进行了fn = obj.foo，所以和上一例子一样；
    fn();
}
window.a = "oops,global";
FOO(obj.foo);//输出oops,global
```
显式绑定;
call, apply, bind
```javascript

```
new绑定；
```javascript

```
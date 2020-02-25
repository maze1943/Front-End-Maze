# ES6知识点整理

[toc]

## 06 Symbol

### 06.1 概述

Symbol是ES6中第七种基本类型，表示一个独一无二的值,通过Symbol函数生成：

```javascript
var s = Symbol();

var s1 = Symbol('s1');//添加描述
```

即使相同描述的两个Symbol值也是不相同的，Symbol不能与其他类型的值进行运算，但是可以显示的转为字符串和布尔值。

### 06.3 作为属性名

Symbol值作为对象属性名，可以保证对象的属性名不会重复：

```javascript
var mySymbol  = Symbol();
var a = {};

a[mySymbol] = 'Hello';
```

注意Symbol作为属性名时，不能使用.操作符来访问该属性。

Symbol作为属性名，不会出现在for...in, for...of循环中，也不会被Object.keys(), Object.getOwnPropertyNames()返回。但它也不是私有属性，有一个Object.GetOwnPropertySymbols方法可以获取指定对象的所有Symbol属性名。

```javascript
var s = Symbol('s');

var a = {
    [s] : 'hello'
}

for(var key in a){
    console.log(key);//无输出
}

Object.getOwnPropertyNames(a);//[]

Object.getOwnPropertySymbols(a);//[Symbol(s)]
```

另一个新的API——Reflect.ownKeys方法可以返回所有类型的键名：

```javascript
Reflect.ownKeys(a);//[Symbol(s)]
```

### 06.4 Symbol.for()、Symbol.keyFor()

Symbol.for()可以用于重新使用同一个Symbol值。它接受一个字符串，作为Symbol值得描述，如果已经存在该Symbol值，则返回该值，否则创建一个对应的Symbol值并注册到全局。

Symbol.keyFor()方法返回一个已登记的Symbol类型值的key。

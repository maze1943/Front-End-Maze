# ES6知识点整理

近期准备面试，把ES6的内容详细复习一遍
**整理来源素材：**
阮一峰《ES6标准入门》（第三版）；
https://www.youtube.com/watch?v=5s35h_6v4ZI&list=PLCRqr1mERvdJ0IZMD1U4oSB7k0gyAjyIx

[toc]

## 01 var、let、const

### 01.1 块级作用域

let及const声明方式类似var，var属于function scope，在function中定义则仅在function内部有效，否则就是全局变量。但let和const是block scope，其只在命令行所在的代码块中有效

```javascript
{
    let a = 1;
    var b = 2;
}
a;//Reference Error
b;//2
```

这个特性使let很适合于for循环的计数器

```javascript
var a = [];
for(var i = 0; i <10; i++){
    a[i] = function(){
        console.log(i);
    }
}
a[6]();//10

var a = [];
for(let i = 0; i < 10; i++){
    a[i] = function(){
        console.log(i);
    }
}
a[6]();//6
```

### 01.2 不存在变量提升

var声明存在变量提升，而let和const是不存在的，必须先声明再使用，否则抛出ReferenceError

### 01.3 暂时性死区

```javascript
var temp =123;
if(true){
    temp = 'abc'//ReferenceError
    let temp;
}
```

如以上代码所示，如果代码块中存在let或const声明，则这个块中声明的这些变量将形成封闭作用域，在声明前不可使用，即“暂时性死区”。

### 01.4 不允许重复声明

同一作用域内不允许重复声明let或const声明的变量

### 01.5 const声明一个只读的常量

const可以声明一个常量，其值不可改变，所以const声明必须在声明的同事为其初始化。
另外，const声明的对象，其属性是可以修改的，因为const不可变的本质是变量指向的地址不可变。如果真的想冻结对象，可以使用Object.freeze()

### 01.6 脱离顶层对象

let及const声明的变量，以及后面提到的class，所声明的全局变量，不再是顶层对象的属性，在浏览器环境中的表现就是let及const的全局变量，不再挂载在window下。
# Array类型及其相关方法探究
(本文参考--《javascript高级程序设计》)

ECMAScript 变量可能包含两种不同数据类型的值：基本类型值和引用类型值。 基本类型值指的是
简单的数据段，而引用类型值指那些可能由多个值构成的对象。基础类型值包括Undefined，Null，Boolean，Number，String；而引用类型则包括Object，Array，Date，RegExp，Function等等。
本文主要针对Array的相关方法进行探究：

### （一）Array基本概念
Array作为除Object之外最常用的引用类型，在js中与其他语言有很多不同之处。
与Object一样，Array也可以使用两种方式创建：
**构造函数**
`let array1 = new Array()`  或者
**字面量表示法**
`let array1 = ["one","two","three"]`。
需要注意的是，这两种创建Array实例的方法有一些细微的不同：
>当传入单个数字参数的时候，构造函数方式会创建一个以传入数字为长度的数组，而传入多个参数时，则会以传入参数作为初始化数据来创建数组
>而字面量方式只要传入参数，均视为初始化数据来创建数组

Array数组的每一项可以保存任何类型的数据，同时其大小也是可以动态调整的，即可以随着数据的添加自动增长以容纳新增数据。
Array数组中的项，可以采类似用array[index]的方式进行访问,例如array1[0]即是array1这个数组的第一项。
数组的项数保存在其 length 属性中，这个属性始终会返回 0 或更大的值。数组的 length 不是只读的。因此，通过设置这个属性，可以从数组的末尾移除项或向数组中添加新项。
 
### （二）Array操作方法
##### 1.检测数组
我们在检测数据类型时经常用到typeof，但我的理解typeof只能准确识别基本数据类型（不包括null，识别null会返回Object），对数组类型值进行typeof判断时，实际会返回Object。

**那我们要如何判断一个变量其类型为Array呢？**
```javascript
let arr = []; 
// instanceof 
arr instanceof Array; 

// constructor 
arr.constructor === Array; 

// Array.prototype.isPrototypeOf 
Array.prototype.isPrototypeOf(arr);

// getPrototypeOf 
Object.getPrototypeOf(arr) === Array.prototype;

// Object.prototype.toString 
//推荐做法，事实上除了Object.prototype.toString，上述四种方法都不能完全准确的判断Array类型(如果将变量的原型指向改变为Array.prototype;以及涉及iframe数组传值)
Object.prototype.toString.apply(arr) === '[object Array]';

// Array.isArray
//（许多文章说是ES6新增方法，笔者翻阅了相关规范，应该是ES5就已经有此方法了）
Array.isArray(arr);
```

#### 2.转换方法  
toLocaleString()、 toString()、 valueOf()和join()方法。

其中，调用数组的 toString()方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。而调用 valueOf()返回的还是数组。

而如果使用 join()方法，则可以使用不同的分隔符来构建这个字符串。 join()方法只接收一个参数，即用作分隔符的字符串，然后返回包含所有数组项的字符串。例如：
```javascript
let colors = ["red", "green", "blue"];
alert(colors.join("||")); //red||green||blue
```

#### 3.栈方法
ECMAScript 为数组专门提供了 push()和 pop()方法，以便实现类似栈（后进先出）的行为。
push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。
pop()方法则从数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。
 

#### 4.队列方法
队列在列表的末端添加项，从列表的前端移除项。由于 push()是向数组末端添加项的方法，因此要模拟队列只需一个从数组前端取得项的方法。实现这一操作的数组方法就是 shift()，它能够移除数组中的第一个项并返回该项，同时将数组长度减 1。结合使用 shift()和 push()方法，可以像使用队列一样使用数组。


ECMAScript 还为数组提供了一个 unshift()方法。顾名思义，unshift()与 shift()的用途相反：它能在数组前端添加任意个项并返回新数组的长度。
 

#### 5.重排序方法
数组中存在两个可以直接用来重排序的方法： reverse()和 sort()。reverse()方法会反转数组项的顺序。sort()方法默认按升序排列数组项，为了实现排序， sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。

sort的默认排序方式在很多情况下都不是最佳方案。因此 sort()方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。
比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。对于数值类型或者其 valueOf()方法会返回数值类型的对象类型，可以直接使用减法处理。
```javascript
let arr = ["0","12","111","2","21"];
console.log(arr.sort()); // 输出["0", "111", "12", "2", "21"]
function sortFunc(a,b){
    return a-b;
}
console.log(arr.sort(sortFunc)); // 输出["0", "2", "12", "21", "111"]
```

#### 6.操作方法
concat()

concat()方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。

slice()

slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。注意， slice()方法不会影响原始数组。

splice()

（1）删除：可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。例如， splice(0,2)会删除数组中的前两项。


（2）插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、 0（要删除的项数）和要插入的项。如果要插入多个项，可以再传入第四、第五，以至任意多个项。例如，splice(2,0,"red","green")会从当前数组的位置 2 开始插入字符串"red"和"green"。


（3）替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (2,1,"red","green")会删除当前数组位置 2 的项，然后再从位置 2 开始插入字符串"red"和"green"。
splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则返回一个空数组）。
```javascript
let arr = [0,1,2,3,4,5];
arr.splice(1,2,100); // 从index1位置，删除2项，并在该位置插入数组项100
console.log(arr); // 输出[0,100,3,4,5]
```
 

#### 7.位置方法
indexOf()和 lastIndexOf()。这两个方法都接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， indexOf()方法从数组的开头（位置 0）开始向后查找， lastIndexOf()方法则从数组的末尾开始向前查找。
这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回1；在比较第一个参数与数组中的每一项时，会使用全等操作符；也就是说，要求查找的项必须严格相等（就像使用===一样）。
 

#### 8.迭代方法
每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响 this 的值。传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。
 

every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。
```javascript
let arr =  [0,1,2,3,4,5];
console.log(arr.some(function(item, index, array){
    return item>2;
})); // 输出 true，因为数组并不是每一项都大于2
```

some()：对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。
```javascript
let arr =  [0,1,2,3,4,5];
console.log(arr.every(function(item, index, array){
    return item>2;
})); // 输出 false，因为数组中存在大于2的数组项
```

filter()：对数组中的每一项运行给定函数，返回该函数返回值为true 的项组成的数组。
```javascript
let arr =  [0,1,2,3,4,5];
console.log(arr.filter(function(item, index, array){
    return item>2;
})); // 输出 [3,4,5]
```

forEach()：对数组中的每一项运行给定函数。这个方法没有返回值。


map()：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
```javascript
let arr = [0,1,2,3,4,5];
console.log(arr.map(function(item, index, array){
    return item*2;
})); // 输出[0,2,4,6,8,10],对数组每一项执行了*2操作
```

#### 9.归并方法
reduce()和 reduceRight()。这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。

其中， reduce()方法从数组的第一项开始，逐个遍历到最后。而 reduceRight()则从数组的最后一项开始，向前遍历到第一项。这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。

给 reduce()和 reduceRight()的函数接收 4 个参数：前一个值、当前值、项的索引和数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。

使用 reduce()方法可以执行求数组中所有值之和的操作，

比如：
```javascript
let values = [1,2,3,4,5];
let sum = values.reduce(function(prev, cur, index, array){
      return prev + cur;
});
console.log(sum); //15
```

## 总结
如果对以上方法做个总结的话，我们可以发现，Array方法可以按照是否会改变原数组来区分为两大类：<br/>
**不改变原数组的：**
```javascript
join
slice
concat
toString
toLocalString
valueOf
以及ES5提供的数组遍历方法：
map
some
every
reduce
filter
forEach

```
**改变原数组的：**
```javascript
splice
pop
push
shift
unshift
sort
reverse
```

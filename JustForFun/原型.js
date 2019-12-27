function A() {
    this.do=function() {return 'foo';};
}
A.prototype=function() {
    this.do=function() {return 'bar'};
};
var x=new A().do();



//这种是原型的重写第一种 没实例化重写原型
function Person(){};
Person.prototype = {
    add :function(){
        alert(this.name);
    },
    name :"aty"
}
var p2 =new Person();
p2.add();//aty 不报错 不信你们可以敲一下代码
// 原因：重写原型对象切断了现有原型与任何之前已经存在的实例之间的联系，他们引用的仍然是最初的原型
// 我们仔细看看这句话，我们并没有在重写原型之前实例化，所以对于实例p2来说 这里依然是相对最初原型

//第二种原型重写 也就是先实例化再重写原型
function Person(){};
var p2 =new Person();
Person.prototype = {
    add :function(){
        alert(this.name);
    },
    name :"aty"
};
p2.add();//error
//这里会报错 原因：重写原型对象切断了现有原型与任何之前已经存在的实例之间的联系，他们引用的仍然是最初的原型
function A() {
    this.do=function() {return 'foo';};
};
A.prototype=function() {
    this.do=function() {return 'bar'};
};
var x=new A().do();
//很显然这里是第一种而不是第二种 这个时候你是不是在想为什么是 "foo",不是"bar"呢，你看看
// 原型上的方法一般怎么写 是A.prototype.方法名
// 如A.prototype.show=function(){},然后再通过实例.show()才可以调用，这里直接将原型重写成一个函数
// 就算修正了constructor，也没有用，
// （2019-2-21: 14:36 更正 如下内容）
// 有A.prototype.do吗显然没有，
// 于是又开始到实例上找有do方法吗
// --------------------分割线-----------------------
// 此处应为  实例上有do 方法吗  
// 有的 所以返回"foo"
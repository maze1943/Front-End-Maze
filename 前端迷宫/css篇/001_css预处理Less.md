# less

less作为一种css预处理语言，基于javascript编写，在客户端进行处理，为缺乏逻辑性的css提供变量，混合，函数等功能，让css更加易于维护。

## 变量

less中的变量是常量，只能定义一次不能重复定义。
变量定义使用 **@变量名 : 变量值** 的方式：

```css
@blackColor : #333;
@width100 : 100px;
@height100 : 100px;

```

定义选择器变量 或 属性名变量时，定义方式相同，但使用变量时，需以 **@{变量名}** 的方式使用

```css
/*选择器*/
@wrap ：wrap;
@anotherWrap : #wrap
/*属性名*/
@fontSize : font-size;

#@{wrap}{
    color : @blackColor;
    @{fontSize} : 10px;
}
@{anotherWrap}{
    width : @width100;
}

/*生成的css*/
#wrap{
    color : #333;
    font-size : 10px;
}
#wrap{
    width : 100px;
}
```

url格式的变量如下：

```css
@imgUrl : "/images";

@{anotherWrap}{
    background-image : url("@{imgUrl}/jsIcon.jpg");
}

/*生成的css*/
#wrap{
    background-image : url("/images/jsIcon.jpg");
}
```

变量的计算：

```css
@width150 : 150px;
@height200 : 200px;

@{anotherWrap}{
    width : @width150 + @height200*2;
}

/*生成的css*/
#wrap{
    width : 550px;
}
```

声明变量，使用方式如下
@变量名 : {}
@变量名();

```css
@circleRed : {
    width : 100px;
    height : 100px;
    border-radius : 100px;
    background-color : red;
}
@{anotherWrap}{
    @circleRed();
}
```

## 嵌套

Less语法中支持嵌套：

```css
ul{
    border : 1px solid #333;
    li{
        color : red;
    }
}

/*生成的css*/
ul{
    border : 1px solid #333;
}
ul li{
    color : red;
}
```

 **&** 符号在参阅的文章中解释为上一层的选择器，我个人的理解更像是一个拼接，在嵌套中如果使用了&，就将&直接替换，否则作为父选择器：

```css
#header{
    &:after{
        content:"Less is more!";
    }
    .title{
        font-weight:bold;
    }
    &_content{
        margin-top:20px;
    }
}

/*生成的css*/
#header:after{//&直接替换为了#header
    content:"Less is more!";
}
#header .title{//没有使用&，#header作为了父选择器.
    font-weight:bold;
}
#header_content{//&直接替换为了#heade
    margin-top:20px;
}
```

## 作用域

类似于其他高级语言，Less中的变量值的查找会选择最近的值，如果当前范围没有找到，则会继续向上查找。

```css
@width : 150px;
ul{
    color : red;
    @width : 100px;
    li{
        width : @width;
    }
}

/*生成的css*/
ul{
    color : red;
}
ul li{
    width : 100px;
}
```

## 混合（Mixin）

定义一个变量的集合，并在样式中使用它(.或#均可)：
结构: .name(){ 属性: 值 ; 属性: 值 ;}
使用：.name();

```css
.square(@weight : 1px, @borderSolid : solid, @color : #333,){
    width : @width100;
    height : @height100;
    border : @arguments;//类似js中的arguments类数组
    color : @color;
}
@{anotherWrap}{
    background-image : url("@{imgUrl}/jsIcon.jpg");
    .square();//未传入参数，使用默认值
}
@{wrap}{
    background-image : url("@{imgUrl}/jsIcon.jpg");
    .square(2px, solid, red);//使用传入的参数
}

/*生成的css*/
#wrap{
    background-image : url("@{imgUrl}/jsIcon.jpg");
    width : 100px;
    height : 100px;
    border : 1px solid #333;
    color : #333;
}
#wrap{
    background-image : url("@{imgUrl}/jsIcon.jpg");
    width : 100px;
    height : 100px;
    border : 2px solid red;
    color : red;
}
```

匹配模式，第一个参数作为用来匹配的标识，类似多态：

```css
/* Less */
.triangle(top,@width:20px,@color:#000){
    border-color:transparent  transparent @color transparent ;
}
.triangle(right,@width:20px,@color:#000){
    border-color:transparent @color transparent  transparent ;
}

.triangle(bottom,@width:20px,@color:#000){
    border-color:@color transparent  transparent  transparent ;
}
.triangle(left,@width:20px,@color:#000){
    border-color:transparent  transparent  transparent @color;
}
.triangle(@_,@width:20px,@color:#000){
    border-style: solid;
    border-width: @width;
}
#main{
    .triangle(left, 50px, #999)
}
/* 生成的 CSS */
#main{
  border-color:transparent  transparent  transparent #999;
  border-style: solid;
  border-width: 50px;
}
```

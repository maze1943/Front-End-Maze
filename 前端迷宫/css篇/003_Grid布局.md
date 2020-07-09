# Grid布局

参考自[CSS Grid 网格布局教程————阮一峰](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

## 基本概念
Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格

1. 容器和项目
采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）
```html
    <div><!--容器-->
        <div><p>1</p></div><!--项目-->
        <div><p>2</p></div><!--项目-->
        <div><p>3</p></div><!--项目-->
    </div>
```

2. 行和列
容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）。
![avatar](/images/grid布局-行和列.png)

3. 单元格
行和列交叉形成的区域就是单元格（cell）

4. 网格线
划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列。

## 容器属性

1. display:grid
使用display: grid指定一个容器采用网格布局。
```css
    div {
        display: grid;
    }

    div {
        /*默认情况下，容器元素都是块级元素，但也可以设成行内元素*/
        display: inline-grid;
    }
```
**注意，设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。**

2. grid-template-columns、grid-template-rows
容器被指定为grid容器之后，需要分别使用grid-template-columns和grid-template-rows指定项目的列宽和行高
```css
.container {/*指定一个三行三列，宽高均为100px的网格*/
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}

.container {/*指定一个三行三列，宽高均为1/3的网格*/
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-template-rows: 33.3% 33.3% 33.3%;
}
```

**repeat()**
项目大量重复时可以使用repeat函数来简化需要重复的值：
repeat()接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);/*重复3次，每个列宽为33.3%*/
  grid-template-rows: repeat(3, 33.33%);
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 100px 20px 80px);/*列宽按照100px，20px，80px的顺序重复两次，即100，20，80，100，20，80的6列*/
}
```

**auto-fill**
单元格大小固定但是容器不固定，希望项目自动填充容器时，可以使用auto-fill属性
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);/*每个单元格列宽100px，自动填充容器*/
}
```

**fr关键字**
网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。
```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;/*2列，第二列为第一列的两倍宽度*/
}

.container {
  display: grid;
  grid-template-columns: repeat(100px 1fr 2fr);/*3列，第一列宽度100px，第三列为第二列的两倍宽度*/
}
```

**minmax()**
minmax()函数得出一个宽度区间，表示宽度介于这个区间中
```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr minmax(100px 1fr);/*3列，第一列宽度100px，第三列为第二列的两倍宽度*/
}
```

**auto**
auto表示宽度由浏览器决定，基本等同于可占用的最大宽度
```css
.container {
  display: grid;
  grid-template-columns: 100px auto 100px;/*3列，第一列宽度100px，第三列100px，第二列占满剩余宽度*/
}
```

3. grid-row-gap，grid-column-gap，grid-gap
grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）
grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式.
```css
.container {
  display: grid;
  grid-template-columns: 100px auto 100px;/*3列，第一列宽度100px，第三列100px，第二列占满剩余宽度*/
  grid-gap:10px 10px;/*相当于grid-row-gap:10px,grid-column-gap:10px*/
  /*grid-gap:10px;与上一行等同，如果grid-gap省略了第二个值，浏览器认为第二个值等于第一个值。*/
}
```
**根据最新标准，上面三个属性名的grid-前缀已经删除，grid-column-gap和grid-row-gap写成column-gap和row-gap，grid-gap写成gap。**

4. grid-template-areas
网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas属性用于定义区域，如果某些区域不需要利用，则使用"点"（.）表示。
```css
.container {
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas:"header header header"
                      "main main sidebar"
                      "footer footer footer";/*将网格划分区域*/
}
```

5.grid-auto-flow
grid-auto-flow决定了网格布局每个项目的排序方式，默认是按先行后列
```css
.container {
    display: grid;
    grid-auto-flow:row;/*按行横向排序*/
    grid-auto-flow:column;/*按列竖向排列*/
    grid-auto-flow:row dense;/*按行横向排序，但尽可能排满空间*/
    grid-auto-flow:column dense;/*按列横向排序，但尽可能排满空间*/
}
```
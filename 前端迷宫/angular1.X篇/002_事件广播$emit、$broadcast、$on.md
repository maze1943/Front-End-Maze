AngularJS中作用域层次分明，不同作用域之间的通信可以通过事件广播的方式进行通信：

## \$on、\$emit和$broadcast
$emit(event,data)向父级作用域传播
$broadcast(event,data)向子级作用域传播
$on(event,function(event,data){})用于接受其他作用域传递的event和data

```javascript
//ng-app
app.controller('selfController',()=>{
    $scope.selfClick = ()=>{
        $scope.$emit('emit','fromSelf');//向父级作用域传递
        $scope.$broadcast('broadcast','fromSelf');//向子级作用域传递
    }
})
app.controller('parentController',()=>{
    $scope.$on('emit',(event,data)=>{
        console.log('parent emit',data);//父controller收到$emit广播，打印‘parent emit fromSelf’
    });
    $scope.$on('broadcast',(event,data)=>{
        console.log('parent broadcast',data);//没有打印
    });
})
app.controller('childController',()=>{
    $scope.$on('emit',(event,data)=>{
        console.log('child emit',data);//没有打印
    });
    $scope.$on('broadcast',(event,data)=>{
        console.log('child broadcast',data);//子controller收到$broadcast广播，打印’child broadcast fromSelf‘
    });
})
```

$on接收的event事件参数有以下这些事件属性：
事件属性|目的
:-:|:-:|
`event.targetScope`|发出或者传播原始事件的作用域|
`event.currentScope`|目前正在处理的事件的作用域|
`event.name`|事件名称|
`event.stopPropagation()`|一个防止事件进一步传播(冒泡/捕获)的函数(这只适用于使用`$emit`发出的事件)|
`event.preventDefault()`|这个方法实际上不会做什么事，但是会设置`defaultPrevented`为true。直到事件监听器的实现者采取行动之前它才会检查`defaultPrevented`的值。|
`event.defaultPrevented`|如果调用了`preventDefault`则为true|
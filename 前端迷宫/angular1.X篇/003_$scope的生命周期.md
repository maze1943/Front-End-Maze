$scope是Angular APP中至关重要的角色，作为表达式执行的上下文，$scope是angularjs实现双向数据绑定的基础。

## $scope
* $scope是一个POJO（plain Old Javascript Object）
* $scope提供了一些工具方法（$watch()/$apply()）
* $scope是表达式的**执行环境** 或 **作用域**
* $scope是一个树形结构，**与DOM标签平行**
* 子$scope会**继承**父$scope上的属性和方法
* 每一个angular应用只有一个根$scope（一般位于ng-app上）
* $scope可以传播事件，类似DOM事件，可以向上也可以向下

### $rootScope
$rootScope是位于所有scope最上层对象，可以理解为一个angular应用的全局作用域，我们可以直接运行app.run，在其中保证在所有其他模块运行前执行并挂载新的$rootScope变量

```javascript
app.run(function($rootScope) {
 $rootScope.greeting = "Hello World";
});
```

### $scope的生命周期

$scope的生命周期有5个阶段：
1. Creation 创建
2. Watcher registration 注册监听
3. Model mutation 模型变化
4. Mutation obervation 脏值检查
5. Scope destruction 销毁
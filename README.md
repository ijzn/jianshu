## 前沿

该项目采用 create-react-app 脚手架构建，仿箭书的简单demo。

技术栈

React + react-router + redux + react-redux + axios 

### 快速开始

```
npm i && npm run dev
```

### react组件 的生命周期 以及 使用场景

**挂载阶段**
```
1. constructor
2. componentWillMount
3. render
4. componentDidMount
```

*使用场景*
```
1. coustructor  
  通常用于初始化组件的state以及绑定事件的处理方法(比如bind(this))等

2. componentWiillMound
  在组件被挂载到DOM前调用，且只会调用一次，
  实际项目中比较少用到，因为可以在该方法中的执行的都可以提到coustructor中
  在这个方法中this.setState不会引起重新渲染

3. render
  渲染方法。
  注意：render只是返回一个UI的描述，真正渲染出页面DOM的工作由react自己完成
  
4. componentDidMount
  在组件被挂载到DOM后调用，且只会调用一次，
  通常用于像后端请求数据
  在这个方法中this.setState会引起组件的重新渲染

```

**更新阶段**

```
1. componentWillReceiveProps
2. shouldComponentUpdate
3. componentWillUpdate
4. render
5. componentDidUpdate
```

*使用场景*
```
1. componentWillRceiveProps(nextProps)
  这个方法只在props引起组件更新时调用。
  一般会比较一下this.props和nextProps来决定是否执行props变化后的逻辑
  比如：根据新的props调用this.setState来触发组件的重新渲染

2. shouldComponentUpdate(nextProps,nextState)
  这个方法决定组件是否继续执行更新过程。 
  默认是true，继续更新；false阻止更新。
  一般是通过比较nextPops，nextState和当前组件的props，state来决定返回结果。 
  这个方法可以减少不必要的渲染，优化组件性能。
  原因：根据渲染流程，首先会判断shouldComponentUpdate是否需要更新。如果需要更新，调用render方法生成新的虚拟DOM与旧的虚拟DOM进行对比(render只是返回一个UI描述)，如果对比不一致，则根据最小粒度改变去更新DOM。

3. componentWillUpdate
  render前调用，组件更新前执行某些逻辑的地方。
  一般很少用到。

4. render

5. componentDidUpdate(prevProps, prevState)
  组件更新后被调用，可以作为操作更新后DOM的地方。
  这个方法中的prevProps和prevState代表组件中更新前的props和state。

注意：在render前的生命周期中，componentWillReceiveProps,shouldComponentUpdate,componentWillUpdate中的this.state依然指向更新前的state。
```
**销毁阶段**
```
componentWillUnmount
  组件卸载前被调用。
  清除定时器，清除componentDidMount中手动创建的DOM，取消请求等
```



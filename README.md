### 前沿

该项目采用 create-react-app 脚手架构建，仿箭书的简单demo。

技术栈

React + react-router + redux + react-redux + axios 

### 快速开始

```
npm i && npm run dev
```

此文适合react新手入门，react大佬可以略过(毕竟以前都是写vue,React才写了一个多月)。

主要是学习react中的一些经验总结，如果你觉得对你有帮助，可以给个star。

react版本：16.0.0 (因为工作中还是15的版本)

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


### 有状态组件 无状态组件

有状态组件：组件内部状态发生变化，需要state来保存变化。

无状态组件：组件内部状态是不变的，用不到state。*建议写成函数组件*

组件设计思路：通过定义少部分有状态组件管理整个应用的状态变化，并且将状态通过props传递给其余无状态组件。 

**有状态组件主要关注处理状态变化的业务逻辑，无状态组件主要关注组件UI渲染工作。这样更有利于组件的复用,组件之间解耦更加彻底**

这样有时就会产生一个问题，如果给UI组件加不同的逻辑怎么办？

2种比较好的方法，
this.props.children 和 HOC ，
[具体实例](https://juejin.im/post/5c131b80f265da61616e9283?utm_source=gold_browser_extension)。那么下面就来详细说说 HOC 高阶组件


知识前置：

[装饰器设计模式](http://www.runoob.com/design-pattern/decorator-pattern.html)：允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。

这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。


### HOC 高阶组件  (封装并分离组件的通用逻辑。其实就是装饰器设计模式的应用)
* 基本概念：

在JS中高阶函数可以接受一个函数作为参数，返回值作为也是函数的函数。类似的 高阶组件也可以接受一个组件为参数，返回一个被加工过的组件。

本质上高阶函数是一个函数，而不是组件。

* 使用场景：

1. 操纵props
2. 通过ref访问组件的实例
3. 组件状态提升
4. 用其他元素包装组件

例子：

1. 操纵props 这个用的比较多
> 在被包装的组件接收到props之前。高阶组件可以先拦截到props,对props执行增删改等操作，然后将修改过的props传给被包装组件。
```
import React, { Component } from 'react'

function withPersistentData (wrapedComponent) {
  return class extends Component {
    componentWillMount() {
      let data = localStore.getItem('data');
      this.setState({data})
    }

    render () {
      const { data } = this.state;
      // 通过{...this.props} 把传给当前组件的值继续传给被包装的组件
      return <wrapedComponent data={data} {...this.props} />
    }
  }
}

@withPersistentData
export default class myComponent extends Component {
  render() {
    return (
      <div>
        {this.props.data}
      </div>
    )
  }
}

```

2. 通过ref访问组件的实例。这个用法我是比较少用到。

> 高阶组件通过ref获取被包装的组件实例的引用，然后高阶组件就具备了直接操作被包装组件的属性和方法的能力。

```
function withRef (wrapedComponent) {
  return class extends Component {
    someMethod = () => {
      // this.wrapedComp        被包装组件实例 
      // someMethodWrapedComp   被包装组件的方法
      this.wrapedComp.someMethodWrapedComp()
    }

    render () {
      // 通过{...this.props} 把传给当前组件的值继续传给被包装的组件
      // 给被包装的组件添加ref属性，获取被包装组件实例并赋值给this.wrapedComp
      return <wrapedComponent ref={(comp) =>{this.wrapedComp = comp}} {...this.props} />
    }
  }
}
```
3. 组件状态提升
> 上面已经说过 无状态组件更容易被复用，我们可以利用高阶组件将原本受控组件中需要自己维护的的状态统一提升到高阶组件中，受控组件无状态化。

```
import React, { Component } from 'react'

function withControlledComp(wrappedComp) {
  state = {
    value : null,
  }
  handleValueChange = (e) => {
    this,setState({value: e.target.value})
  }

  render () {
    const newProps ={
      controlledProps: {
        value: this.state.value,
        onChange: this.handleValueChange
      }
    }
    return <wrappedComp {...this.props} {...newProps} />
  }
}

@withControlledComp
class ControlledComp extends Component {
  render () {
    // 此时的受控组件为无状态组件，状态由高阶组件控制
    return <input {...this.props.controlledProps} />
  }
}
```
4. 用其他元素包装组件

```
function withRedColor (wrapedComponent) {
  return class extends Component {
    render () {
      return (<div style={color: 'red}><wrapedComponent {...this.props} /> </div>)
    }
  }
}
```

<br />
<br />
<br />
* 参数传递
高阶组件的参数除了接受组件，还可以接受其他参数。

在第一个操作props的例子里，如果要获取key值不确定时，这个组件就不满足了。

我们一般采用这种方式:HOC(...params)(wrappedComp)

```
function withPersistentData = (key) => (wrapedComponent) => {
  return class extends Component {
    componentWillMount() {
      let data = localStore.getItem(key);
      this.setState({data})
    }

    render () {
      const { data } = this.state;
      // 通过{...this.props} 把传给当前组件的值继续传给被包装的组件
      return <wrapedComponent data={data} {...this.props} />
    }
  }
}

class myComponent extends Component {
  render() {
    return (
      <div>
        {this.props.data}
      </div>
    )
  }
}

// 获取key=‘data’的数据
const myComponentWithData = withPersistentData('data')(myComponent)

// 获取key=‘name’的数据
const myComponentWithData = withPersistentData('name')(myComponent)
```
实际上这种形式的高阶组件大量出现在第三方的库中，例如react-redux中的connect函数 

```
connect(mapStateToProps, mapDispatchToProps)(wrappedComponent)
```
<br>
<br>
<br>
* 注意事项

1. 不要在render中使用高阶组件，也尽量不要在其他的生命周期函数中使用高阶组件。 因为高阶组件每次返回的都是一个新组件，于是每次render，前一次创建的组件都会被卸载，本次创建的组件会被重新挂载。
2. 如果需要使用被包装组件的静态方法，就必须要手动复制这些方法。因为高阶组件不包含被包装组件的静态方法。
3. Refs不回被传递给被包装组件。
4. 与父组件的区别。如果这部分逻辑与UI/DOM相关，那么这部门逻辑适合放在父组件中实现；如果逻辑与DOM不直接相关，那么这部分逻辑适合放在高阶组件的抽象中。例如数据校验请求发送等

参考：<br/>
[react进阶之路](https://item.jd.com/12325717.html)<br >
[react从入门到实战](https://coding.imooc.com/class/229.html)

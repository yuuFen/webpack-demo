// //! module 
// import('./index.css')
// import('./a.css')
// import('./index.less')
// import test from './test.png'

// console.log(test);
// const img = new Image()
// img.src = test

// const root = document.getElementById('root')
// root.append(img)

// //! mock
// import axios from 'axios'

// axios.get('/api/info').then(res => {
//   console.log(res);
// })

// //! HMR
// const btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)

// btn.onclick = function () {
//   const div = document.createElement('div')
//   div.innerHTML = 'item'
//   document.body.appendChild(div)
// }

// //! js module HMR
// import counter from './counter.js'
// import number from './number.js'
// counter()
// number()
// //* 需要手动监听设置回调
// if (module.hot) {
//   module.hot.accept('./number.js', function (e) {
//     console.log('模块改动了', e);
//     document.body.removeChild(document.getElementById('number'))
//     number()
//   })
// }

// //! bable: 分析依赖 => 抽象语法树AST => 通过语法转换规则转换代码 => 生成代码
// const arr = [new Promise(() => { }), new Promise(() => { }), new Promise(() => { }), new Promise(() => { })]
// app.map(item => {
//   console.log(item);
// })

//! 使用 babel 打包 react 代码
import React, { Component } from "react";
import ReactDom from "react-dom";

class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}

ReactDom.render(<App />, document.getElementById("root"));
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'

import 'antd/dist/antd.css';
import './index.css'
import App from "./App.js"
import store from './store/index'


// ReactDOM.render(
// <Provider store={store}>
//   <App />
// </Provider>, 
// document.getElementById("root"))
ReactDOM.render(
  <App />,
document.getElementById("root"))
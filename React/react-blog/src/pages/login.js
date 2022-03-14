import React, { Component } from 'react';
import ReactDOM from "react-dom"
import { Input, Button, message } from 'antd';
import { withRouter } from "react-router-dom";
import md5 from 'md5'
// import "../css/login.css"

import { mountNode } from '../utils/someutils.js'
import * as server from '../api/login'


class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "admin",
			password: "hefeng6500",
			code: "", // 服务器返回的验证码
			validCode: ""
		}
		this.usernameChange = this.usernameChange.bind(this)
		this.passwordChange = this.passwordChange.bind(this)
		this.login = this.login.bind(this)
		this.getCode = this.getCode.bind(this)
	}

	componentDidMount() {
		this.getCode()
	}

	usernameChange(e) {
		this.setState({ username: e.target.value })
	}

	passwordChange(e) {
		this.setState({ password: e.target.value })
	}

	getCode() {
		server.getCode().then( res => {
			this.setState({
				code: res.data.data
			})
		})
	}

	validCodeChange = (e) => {
		this.setState({ validCode: e.target.value })
	}

	login() {
		let data = {
			username: this.state.username,
			password: md5(this.state.password),
			type: 1,
			code: this.state.validCode
		}
		server.login(data).then(res => {
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('token_exp', new Date().getTime());
			// ReactDOM.render(<Alert message="Success Tips" type="success" showIcon />,mountNode)
			message.success('登录成功！')
			this.props.history.push("/")
		}).catch(err => {
			this.getCode()
		})
	}
	
	handleKeyDown = (e) => {
		if(e.keyCode === 13){
			this.login()
		}
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="userBox">
						<h1 className="title">Wisdom Blog</h1>
						<p className="welcome">Welcome!</p>
						<input className="login-input" placeholder="请输入用户名" type="text" value={this.state.username} onChange={this.usernameChange} />
						<input className="login-input" placeholder="请输入密码" type="password" value={this.state.password} onChange={this.passwordChange} />
						<input className="login-input" placeholder="请输入验证码" type="text" value={this.state.validCode} onChange={this.validCodeChange} />
						<div className="validCode" onClick={this.getCode} dangerouslySetInnerHTML={{ __html: this.state.code }}></div>
						<Button className="login-btn" onClick={this.login} onKeyDown={this.handleKeyDown}>登录</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Login)
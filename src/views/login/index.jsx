import React, { Component } from 'react'
import { Input,Button  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.less'
export default class index extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
    }
    LoginOk=()=>{
        //登录发送请求拿到token 存到本地缓存
        localStorage.setItem("key","value")
        this.props.history.push('/Admin')
    }
    render() {
        return (
            <div className="login-auto">
                 <Input placeholder="账号" prefix={<UserOutlined />} />
                 <Input.Password placeholder="密码" prefix={<UserOutlined />} />
                 <Button type="primary" className="login-button" onClick={this.LoginOk}>登录</Button>
            </div>
        )
    }
}

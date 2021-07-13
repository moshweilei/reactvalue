import React, { Component } from 'react'
import { Layout } from 'antd';
import './index.less'
import LeftNav from '../../components/leftNav/leftNav.jsx'
import Home from '../home'
import { Route,Switch,Redirect } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
export default class index extends Component {
    //只要是加载Admin组件就读取本地的用户信息
    // 如果本地没有该用户的信息就重定向到login
    // 如果本地有改用户的信息就加载admin组件

    render() {
       const user= localStorage.getItem('key')||{} 
       if(user=="value"){
        return (
            <Layout style={{height:'100%'}}>
                <Sider >
                     <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        <Switch>
                            <Route path='/admin/home' component={Home} ></Route>
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
            
       }else{
           console.log("不会执行")
        return <Redirect to="/login" />
       }
    }
}

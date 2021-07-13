import React, { Component } from 'react'
import { Menu } from 'antd';
import menusConfig from '../../config/menusConfig';
import {NavLink, withRouter} from 'react-router-dom'
import {PieChartOutlined,MailOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;

class LeftNav extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
  }
  state={
    menus:[]
  }
  //render之前 dom未挂载
    componentWillMount(){
      //初始化菜单栏的结构 因为初始化是同步的 所以放在该钩子中
      //  this.menus= this.getMenus(menusConfig)
    } 
  //render之后 dom已经挂载
    componentDidMount(){
      this.getRoleNenus()
    }
    

    //请求权限接口
    getRoleNenus(){
    this.roleAuth=['/admin/home','/admin/category','/admin/product']
    // this.menus=this.getMenus(menusConfig)
    this.setState({
      menus:this.getMenus(menusConfig)
    },()=>{
      console.log(this.state.menus,"???")
    })
   
    }

    //该函数的作用是根据角色的权限数据 来判断有没有看到item的权限 返回值是true表示有item的权限false表示没有
    hasAuth=(item)=>{
      if(this.roleAuth.includes(item.key)){
        return true
      }else if(item.children){//判断二级菜单里面有没有符合权限的
       return item.children.find(cItem=>this.roleAuth.includes(cItem.key))
      }
      else{
        return false
      }
    }

    getMenus(menus){
      const {pathname}=this.props.location
        return  menus.map((item,index)=>{
          //判断登录的用户有没有item的权限
          if(this.hasAuth(item)){
            console.log("asda",item)
            if(item.children){//如果是可收缩的选项
              //从有子菜单中寻找初始化打开的一级菜单
              const result=item.children.filter(cItem=>{
                return pathname===cItem.key
              })
              if(result.length){//如果在有childer的数组中找到了匹配pathname的key值那么把父的key给defaultOpenKeys给men组件默认展开选项
                this.defaultOpenKeys=item.key
              }
                return  <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                {
                  this.getMenus(item.children)//递归调用getMenus
                }
              </SubMenu>
            }else{
                return <Menu.Item key={item.key} >
                    <NavLink to={item.key}>
                    <PieChartOutlined />
                     {item.title}
                    </NavLink>
                   </Menu.Item>
              }
           }
        })
    }
    render() {
      const {pathname} =this.props.location
      return (
          <div>
              <Menu
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={[this.defaultOpenKeys]}
                mode="inline"
                theme="dark"
              >
                  {
                      // menusConfig.map((item,index)=>{
                      //     if(item.children){
                      //       return  <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                      //        {
                      //            item.children.map((item,index)=>{
                      //             return  <Menu.Item key={item.key}>{item.title}</Menu.Item>
                      //            })
                      //        }
                      //       </SubMenu>
                      //     }else{
                      //         return <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                      //         {item.title}
                      //        </Menu.Item>
                      //     }
                      // })
                      this.state.menus
                  }
              </Menu>
          </div>
        )
    }
}

export default withRouter(LeftNav)
//如何让非路由组件 具有路由组件的三个属性 history Location match
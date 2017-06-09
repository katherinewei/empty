import React, {PropTypes} from "react";
import {Layout,Menu, Icon} from "antd";
import {connect} from "dva";
import {Link} from "dva/router";
import {getString, scrollTop} from '../../utils/helper'
import Logo from "./Logo";
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const {  Sider } = Layout;
class SiderC extends React.Component {


    onCollapse = (collapsed) => {
        this.setState({
            collapsed:!this.state.collapsed,
            mode: !this.state.collapsed ? 'vertical' : 'inline',
        });
    }

    constructor(props) {
        super(props);
        const menus = this.getMenu();
        let newArray = [],newMenus=[],firstLoadMenu=false;

        {menus.map((menu, i) => (
            newMenus.push(menu.url)
        ))}
        for(let key in newMenus){
            newArray[key] = false;
            if(location.pathname.indexOf(newMenus[key]) >= 0 ){
                newArray[key] = true;
                firstLoadMenu= true;
            }
        }
        if(location.pathname.indexOf('device') >= 0 || location.pathname.indexOf('group') >= 0){
            newArray[3] = true;
            firstLoadMenu= true;
        }
        if(location.pathname.indexOf('consumable') >= 0){
            newArray[2] = true;
            firstLoadMenu= true;
        }

        if(!firstLoadMenu){
            newArray[0] = true;
        }
        this.state = {
            current: '1',
            linked:newArray,
            openKeys: [],
            collapsed: false,
            mode: 'inline',
        };

    }

    handleClick = () =>{
            scrollTop();
            const menus = this.getMenu();
            let newArray = [],newMenus=[];

            {menus.map((menu, i) => (
                newMenus.push(menu.url)
            ))}
            for(let key in newMenus){
                newArray[key] = location.pathname === newMenus[key]
            }
            this.setState({linked:newArray});
    }

    getMenu(){
        return this.props.menu[this.props.menus]
    }

    render() {
        const menus = this.getMenu();
        return (
            <Sider style={{ height:'100%'}}

                   width="200"
                   trigger={null}
                   collapsible
                   collapsed={this.state.collapsed}>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.onCollapse}
                />

                <Logo/>
                <Menu selectedKeys={[this.state.current]} mode={this.state.mode}>
                    {menus.map((menu, i) => {
                        return <SubMenu key={`${menu.url}`} className={this.state.linked[i] ? 'active' : ''} onTitleClick={this.handleClick}
                                        title={<Link to={menu.url}><span><i className={`anticon icon-self icon-${menu.icon}`}/><span>{getString(menu.label)}</span></span></Link>}>
                                    {menu.items && menu.items.map((item, j) => {

                                        return <MenuItem key={`${item.url + i}`}><Link
                                            to={item.url}>{getString(item.label)}</Link></MenuItem>
                                    })
                                    }
                        </SubMenu>

                    })}
                </Menu>
            </Sider>
        )
    }
}

SiderC.propTypes = {
    menus: PropTypes.string.isRequired,
}

export default connect(({menu}) => ({menu}))(SiderC)
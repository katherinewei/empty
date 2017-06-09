import React, {PropTypes} from "react";
import { Menu, Dropdown, Icon} from 'antd';
import {Link} from "dva/router";
import {connect} from "dva";
import {getString} from '../../utils/helper'
import styles from "./Header.less";
import {loadValidator, isUser} from "../../models/validator";

const Header = ({dispatch}) => {
    function logout() {
        dispatch({type: 'user/logout'})
    }

    const menu = (
        <Menu>
            {isUser() == true ?
                <Menu.Item>
                    <Link to="/password/change">
                        <Icon type="setting" />&nbsp;&nbsp;{getString('header_changePassword')}
                    </Link>
                </Menu.Item> : <Menu.Item>
                    <Link to="/admin/password/change">
                        <Icon type="setting" />&nbsp;&nbsp;{getString('header_changePassword')}
                    </Link>
                </Menu.Item>
            }
            <Menu.Item>
                <a onClick={logout}> <Icon type="logout"/> &nbsp;&nbsp;{getString('header_quit')}</a>
            </Menu.Item>
        </Menu>
    );

    let userName = loadValidator();
    return (
        <div className={styles.header}>
            <div className={styles.brand}>
                <div className={styles.logoimg}></div>
                <div></div>
            </div>
            <div className={styles.user}>

                <a href="http://pay.saiyaoyun.com/" target="_blank"><div className={styles.headerBut}><span className="icon-zhifuzhongxinlianjie icon-self"/>{getString('header_backstage')}</div></a>
                <span style={{borderLeft:'1px solid #eaeaec'}} />
                <Dropdown overlay={menu} placement="bottomRight">
                    <div className={styles.headerBut}><Icon type="user" className={styles.IconCom}/> {userName.name}&nbsp;&nbsp;<Icon type="down" /></div>
                </Dropdown>

            </div>
        </div>
    );


}

export default connect(({user}) => ({user}))(Header)

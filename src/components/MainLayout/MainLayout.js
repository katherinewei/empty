import React, {PropTypes} from "react";
import { Layout } from 'antd';
import styles from "./MainLayout.less";
import Header from "./Header";
import Menu from "./Menu";
const {  Content } = Layout;

function MainLayout({dispatch,children, location, menus}) {

    return (
        <Layout style={{ height:'100%'}} className="ant-layout-has-sider">

            <Menu location={location} menus={menus} dispatch={dispatch}/>

            <Layout>
                <Header location={location}/>
                <Content>
                    <div className={styles.main}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );

}



export default MainLayout;

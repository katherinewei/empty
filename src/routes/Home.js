import React, {PropTypes} from "react";
import MainLayout from "../components/MainLayout/MainLayout";

const Home = ({children}) => {
    return (
        <MainLayout menus="user">
            {children}
        </MainLayout>
    )
}

Home.propTyeps = {}

export default Home
import React from "react";
import {connect} from "dva";
import {history} from '../config'


const CountOperation = ({location }) => {

    return (
        <div style={{padding:20,borderRight:'15px solid #f4f4f4'}}>
           page1
        </div>


    )
}

export default connect(({count}) => ({count}))(CountOperation)
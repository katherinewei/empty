import React from "react";
import {connect} from "dva";

const Orders = ({location, dispatch}) => {

    return (
        <div style={{padding:20}}>
           page2
        </div>
    )
}



export default (connect(({orders}) => ({orders}))(Orders))
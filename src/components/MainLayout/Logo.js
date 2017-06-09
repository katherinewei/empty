import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './Logo.less'
import {getString} from "../../utils/helper";
function Logo() {
    const logo = require('../../assets/images/logoWhite.png');
    return (
        <div className="logo">
            {
                 <Link to="/"><img src={'/'+logo} className="logoImg"/>{getString('title_header_logo')}</Link>

            }

        </div>
    )

}


export default Logo;


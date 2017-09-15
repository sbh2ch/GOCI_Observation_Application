/**
 * Created by sonbyeonghwa on 2017. 9. 13..
 */
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import {media} from '../lib/style-utils';

const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 350px;
    bottom: 0px;
    z-index: 4;

    /* 색상 */
    background: ${oc.gray[2]};
    color: #9c9c9c;
    border-top: 1px solid #bcbcbc;
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);

    /* 폰트 */
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
`;


const Header = () => (
    <Wrapper>
        <img width="45px" height="45px" alt="" src="assets/images/foot_HSB.png" style={{marginRight: '3rem'}}/>
        <img width="90px" height="90px" alt="" src="assets/images/foot_KIOST.png"/>
    </Wrapper>
);

export default Header;
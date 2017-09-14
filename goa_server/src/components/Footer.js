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
    transition: all .1s;
    position: fixed;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 100%;
    bottom: 0px;
    z-index: 5;

    /* 색상 */
    background: ${oc.gray[2]};
    color: #9c9c9c;
    border-top: 6px solid #1696e7;
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);

    /* 폰트 */
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    
`;


const Header = () => (
    <Wrapper>
        © 2017 All Rights Reserved.&nbsp;<p style={{color:oc.blue[7]}}>KOSC</p>
    </Wrapper>
);

export default Header;
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
    padding-left: 2rem;
    align-items: center;
    height: 50px;
    width: 100%;
    top: 0px;
    z-index: 5;

    /* 색상 */
    background: ${oc.blue[6]};
    color: white;
    border-bottom: 1px solid ${oc.blue[7]};
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);

    /* 폰트 */
    font-size: 1.3rem;
    font-family: 'Volkhov', cursive;
    text-shadow: 1px 1px 2px #000;
    
    ${media.mobile`
        font-size: 1.1rem;
        padding-left: 2rem;
        // height: 60px;
    `}
`;


const Header = () => (
    <Wrapper>
        GOCI Observation Application
    </Wrapper>
);

export default Header;
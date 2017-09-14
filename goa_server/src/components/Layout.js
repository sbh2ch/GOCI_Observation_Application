/**
 * Created by sonbyeonghwa on 2017. 9. 13..
 */
import React from 'react';
import styled from 'styled-components';
import {media} from '../lib/style-utils';
import oc from 'open-color';

const Wrapper = styled.div`
    padding-top: 50px; /* 헤더 높이 */
    height: ${window.innerHeight - 1}px;
    font-family: 'Open Sans', sans-serif;
    
    
    ${media.mobile`
        padding-top: 60px; /* 헤더 높이 */
    `}
`;

class Layout extends React.Component {
    componentDidMount() {
        window.addEventListener('resize', () => {
            this.main.style.height = window.innerHeight - 1 + 'px'
        });
    }

    render() {

        return (
            <div
                id="main"
                ref={ref => this.main = ref}
                style={{
                    paddingTop: '50px',
                    height: window.innerHeight - 1 + 'px',
                    fontFamily: 'Open Sans, sans-serif'
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

Layout.Main = styled.div`
    margin: 0 auto;
    display: flex;
    width: 100%;
    transition: all .3s;
    position: relative;
    height: 100%;
    

    ${media.desktop`
    `}

    ${media.tablet`
    `}

    ${media.mobile`
    `}
`;

Layout.Map = styled.div`
    display: flex;
    background: ${oc.gray[3]};
    flex-direction: column;
    height: 1000px;
    flex: 1;
    padding-bottom: inherit;
`;

Layout.Option = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    display: flex;
    flex-basis: 400px;
    padding-bottom: inherit;
    overflow: auto;
    border-right: 1px solid ${oc.gray[4]};
`;

Layout.Title = styled.div`
    display: flex;
    height: 2rem;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color:${oc.gray[9]};
    width: 100%;
    font-weight: 300;
    letter-spacing: 0.01em;
`;

export default Layout;
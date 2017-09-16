/**
 * Created by sonbyeonghwa on 2017. 9. 16..
 */
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    z-index: 10;
    
`;

const Spinner = ({visible}) => visible ? (
    <Wrapper>
        <svg width="70" height="70" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke={oc.blue[9]}>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"/>
                    </path>
                </g>
            </g>
        </svg>
    </Wrapper>
) : null;

Spinner.propTypes = {
    visible: PropTypes.bool
};

export default Spinner;
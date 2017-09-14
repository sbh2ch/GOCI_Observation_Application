/**
 * Created by sonbyeonghwa on 2017. 9. 14..
 */
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width: 330px;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-contents: space-between;
`;

const StyledTimeButton = styled.div`
    background: ${props => props.isSelect ? '#3498DB' : '#e9ecef'};
    color: ${props => props.isSelect ? '#e9ecef' : oc.gray[9]};
    width: 30px;
    transition: all .2s;
    height: 30px;
    border-radius: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex: 1;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.10);
    user-select: none;
    
    margin-left: 0.4rem; 
    margin-right: 0.4rem;
    
    &:hover {
        background: ${props => props.isSelect ? oc.blue[7] : oc.gray[4]};
    }
`;

const TimeButton = ({isSelect, children}) => (
    <StyledTimeButton isSelect={isSelect}>{children}</StyledTimeButton>
);

const PickTime = ({time}) => (
    <Wrapper>
        <TimeButton isSelect={time === '00'}>0</TimeButton>
        <TimeButton isSelect={time === '01'}>1</TimeButton>
        <TimeButton isSelect={time === '02'}>2</TimeButton>
        <TimeButton isSelect={time === '03'}>3</TimeButton>
        <TimeButton isSelect={time === '04'}>4</TimeButton>
        <TimeButton isSelect={time === '05'}>5</TimeButton>
        <TimeButton isSelect={time === '06'}>6</TimeButton>
        <TimeButton isSelect={time === '07'}>7</TimeButton>
    </Wrapper>
);

PickTime.defaultProps = {
    time: '00'
}

export default PickTime;
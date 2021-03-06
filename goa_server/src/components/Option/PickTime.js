/**
 * Created by sonbyeonghwa on 2017. 9. 14..
 */
import React, {Component} from 'react';
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

const TimeButton = ({isSelect, children, handleChange}) => (
    <StyledTimeButton isSelect={isSelect} onClick={() => handleChange(children)}>{children}</StyledTimeButton>
);


class PickTime extends Component {
    handleChange = (value) => {
        const {onTimeChange, year, type, month, day, map, getMapType} = this.props;
        const time = `0${value}`;
        const naver = window.naver;
        onTimeChange({name: 'time', value: time});

        map.setOptions('mapTypes', new naver.maps.MapTypeRegistry({
            'RGB': getMapType(type, year, month, day, time),
        }));
    };

    render() {
        const {time} = this.props;
        const {handleChange} = this;

        return (
            <Wrapper>
                <TimeButton isSelect={time === '00'} handleChange={handleChange}>0</TimeButton>
                <TimeButton isSelect={time === '01'} handleChange={handleChange}>1</TimeButton>
                <TimeButton isSelect={time === '02'} handleChange={handleChange}>2</TimeButton>
                <TimeButton isSelect={time === '03'} handleChange={handleChange}>3</TimeButton>
                <TimeButton isSelect={time === '04'} handleChange={handleChange}>4</TimeButton>
                <TimeButton isSelect={time === '05'} handleChange={handleChange}>5</TimeButton>
                <TimeButton isSelect={time === '06'} handleChange={handleChange}>6</TimeButton>
                <TimeButton isSelect={time === '07'} handleChange={handleChange}>7</TimeButton>
            </Wrapper>
        );
    }
}


export default PickTime;

/**
 * Created by sonbyeonghwa on 2017. 9. 14..
 */
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import PickDate from './PickDate';
import PickTime from './PickTime';
import TypeSelector from "./TypeSelector";

const Wrapper = styled.div`
    height: 102px;
    padding: .7rem;
    width: 100%;
    background: ${oc.gray[3]};
    border-bottom: 1px solid #bcbcbc;
`;

const Date = ({year, month, day, time, isOpen, onToggle, onTimeChange}) => (
    <Wrapper>
        <PickDate year={year} month={month} day={day} isOpen={isOpen} onTimeChange={onTimeChange} onToggle={onToggle}/>
        <PickTime time={time} onTimeChange={onTimeChange}/>
    </Wrapper>
);

Date.propTypes = {
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
    time: PropTypes.string,
    onTimeChange: PropTypes.func,
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func,
};

export default Date;
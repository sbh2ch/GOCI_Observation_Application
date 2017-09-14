/**
 * Created by sonbyeonghwa on 2017. 9. 14..
 */
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import LeftIcon from 'react-icons/lib/go/chevron-left';
import RightIcon from 'react-icons/lib/go/chevron-right';
import CalendarIcon from 'react-icons/lib/go/calendar';
import './DateIcon.css';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const StyledSelectedDate = styled.a`
    padding-left: .3rem;
    padding-right: .8rem;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 1.5rem;
`;

const SelectedDate = ({date}) => (
    <StyledSelectedDate>{date}</StyledSelectedDate>
);

SelectedDate.propTypes = {
    date: PropTypes.string,
};

const PickDate = ({date}) => (
    <Wrapper>
        <LeftIcon size={25} className="date_icon" onClick={()=>console.log('left')}/>
        <SelectedDate date={date}/>
        <CalendarIcon size={16} className="date_icon" style={{marginTop:'.5px', marginRight: '3px'}}/>
        <RightIcon size={25} className="date_icon"/>
    </Wrapper>
);

PickDate.propTypes = {
    date: PropTypes.string
};

PickDate.defaultProps = {
    date: '2017.09.13'
};

export default PickDate;
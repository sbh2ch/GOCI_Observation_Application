/**
 * Created by sonbyeonghwa on 2017. 9. 14..
 */
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import PickDate from './PickDate';
import PickTime from './PickTime';

const Wrapper = styled.div`
    height: 102px;
    padding: .7rem;
    width: 100%;
    background: ${oc.gray[3]};
    border-bottom: 1px solid #bcbcbc;
`;

const Date = ({date, time}) => (
    <Wrapper>
        <PickDate/>
        <PickTime/>
    </Wrapper>
);

Date.propTypes = {
    date: PropTypes.string,
    time: PropTypes.string
};

export default Date;
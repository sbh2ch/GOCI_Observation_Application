/**
 * Created by sonbyeonghwa on 2017. 9. 14..
 */
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import PickDate from './PickDate';

const Wrapper = styled.div`
    height: 100px;
    padding: .7rem;
    width: 100%;
    background: ${oc.gray[3]};
`;

const Date = ({date, time}) => (
    <Wrapper>
        <PickDate/>
    </Wrapper>
);

Date.propTypes = {
    date: PropTypes.string,
    time: PropTypes.string
};

export default Date;
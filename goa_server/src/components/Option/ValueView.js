import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 150px;
    padding: 1rem;
    
    border-bottom: 1px solid #bcbcbc;
`;

const StyledValue = styled.div`
    height: 2rem;
    display: flex;
    flex-direction: row;
    font-size: 1rem;
    align-items: space-between;
    padding-left: 5px;
    
    & + & {
        margin-top: 1rem;
    }
`;

const Box = styled.div`
    background: ${oc.gray[3]};
    flex: 2;
    padding: 3px;
    height: 2rem;
    border-radius: 2px;
    font-weight: bold;
    text-align: right;
    padding-right: 3rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.20);
`;

const Type = styled.div`
    user-select: none;
    flex: 3;
    padding: 3px;
    height: 2rem;
    width: 100px;
`;

const Value = ({children, value, type}) => (
    <StyledValue>
        <Type>{children}</Type><Box>{value}</Box>
    </StyledValue>
);

const ValueView = ({type, selected}) => (
    <Wrapper>
        <Value value={selected.lat}>Latitude</Value>
        <Value value={selected.lon}>Longitude</Value>
        <Value value={selected.value} type={type}>Value</Value>
    </Wrapper>
);

export default ValueView;
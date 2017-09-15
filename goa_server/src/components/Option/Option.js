import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    display: flex;
    flex-basis: 350px;
    padding-bottom: inherit;
    overflow: auto;
    border-right: 1px solid ${oc.gray[4]};
`;

const Option = ({children}) => (
    <Wrapper>{children}</Wrapper>
);

export default Option;
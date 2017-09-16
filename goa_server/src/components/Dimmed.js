/**
 * Created by sonbyeonghwa on 2017. 9. 16..
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Black = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    
    z-index: 5;
    background: rgba(0,0,0,0.4);
`;

const Dimmed = ({visible}) => (
    <div>
        {visible && <Black visible={visible}/>}
    </div>
);

Dimmed.propTypes = {
    visible: PropTypes.bool
};

export default Dimmed;
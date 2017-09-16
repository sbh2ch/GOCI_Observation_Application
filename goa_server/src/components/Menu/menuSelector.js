/**
 * Created by sonbyeonghwa on 2017. 9. 13..
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import CropIcon from 'react-icons/lib/md/crop';
import MarkerIcon from 'react-icons/lib/fa/map-marker';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #252525;
    flex-basis: 65px;
    flex-shrink: 0;
`;

const StyledMenu = styled.div`
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s;
    
    background: ${props => props.active ? oc.blue[8] : '#252525'};
    
    cursor: pointer;
    color: ${oc.gray[1]};
    
    &:hover {
        background: ${props => props.active ? oc.blue[9] : oc.gray[8]};
    }
`;

StyledMenu.propTypes = {
    active: PropTypes.bool
};

const Item = ({children, selected, name, handleClick}) => (
    <StyledMenu active={selected === name} onClick={()=>handleClick(selected, name)}>
        {children}
    </StyledMenu>
);

Item.propTypes = {
    selected: PropTypes.string,
    name: PropTypes.string,
    handleClick: PropTypes.func
};

class menuSelector extends Component {
    render() {
        const {mode, handleMenuClick} = this.props;
        return (
            <Wrapper>
                <Item selected={mode} name="value" handleClick={handleMenuClick}>
                    <MarkerIcon size={25}/>
                </Item>
                <Item selected={mode} name="crop" handleClick={handleMenuClick}>
                    <CropIcon size={25}/>
                </Item>
            </Wrapper>
        );
    };
}

menuSelector.propTypes = {
    mode: PropTypes.string,
    handleMenuClick: PropTypes.func
};

export default menuSelector;
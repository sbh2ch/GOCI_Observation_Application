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

const Item = ({children, selected, name}) => (
    <StyledMenu active={selected === name}>
        {children}
    </StyledMenu>
);

Item.propTypes = {
    selected: PropTypes.string,
    name: PropTypes.string,
};

class ItemSelector extends Component {
    render() {
        const {selected} = this.props;
        return (
            <Wrapper>
                <Item selected='crop' name='pointer'>
                    <MarkerIcon size={25}/>
                </Item>
                <Item selected='crop' name='crop'>
                    <CropIcon size={25}/>
                </Item>
            </Wrapper>
        );
    };
}

ItemSelector.propTypes = {
    selected: PropTypes.string
};

export default ItemSelector;
import React, {Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import OkIcon from 'react-icons/lib/fa/check';
import NoIcon from 'react-icons/lib/fa/close';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 150px;
    padding: 1rem;
    
    border-bottom: 1px solid #bcbcbc;
`;

const StyledFirstButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;  
    transition: all .2s;
    width: 100%;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.10);
    height: 2rem;
    color: white;
    cursor: ${props => props.step === 1 && props.type !== 'RGB' ? 'pointer' : 'no-drop'};
    background: ${props => props.step === 1 && props.type !== 'RGB' ? oc.blue[7] : oc.gray[4]};

    ${props => props.step === 1 && props.type !== 'RGB' ? '&:hover{background:#1b6ec2;}' : ''}
    
`;

const StyledSecondButton = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    height: 2rem;
    justify-content: center;
    flex-direction: row;
    margin-top: 1rem;
    margin-bottom: 1rem;
    cursor: ${props => props.step === 2 && 'pointer'};
`;
const StyledThirdButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    color: white;
    transition: all .2s;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.10);
    width: 100%;
    height: 2rem;
    cursor: ${props => props.step === 3 && 'pointer'};
    background: ${props => props.step === 3 ? oc.blue[7] : oc.gray[4]};

    ${props => props.step === 3 ? '&:hover{background:#1b6ec2;}' : ''}
    
`;

const MakeButtons = styled.div`
    flex: 2;
    display: flex;
`;

const MakeButtonOK = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;

    color: white;
    cursor: pointer;
    background: #37b24d;
    
    &:hover {
        background: #40c057;
    }
`;
const MakeButtonNO = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;

    color: white;
    cursor: pointer;
    background: #f03e3e;
    
    &:hover {
        background: #fa5252;
    }
`;

const TypeButtons = styled.div`
    background: white;
    flex: 3;
    display: flex;
    position: relative;
`;

const StyledItem = styled.div`
    flex: 1; 

    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    
    color: ${oc.gray[9]};

    /* 기타 */
    font-size: 1rem;
    cursor: pointer;

    /* 마우스가 위에 있을 때 */
    &:hover {
        background: ${oc.gray[0]};
    }
`;

const Bar = styled.div`
    /* 레이아웃 */
    position: absolute;
    bottom: 0px;
    height: 4px;
    width: 50%;
    transition: ease-in .25s;
    transform: ${props => props.right ? 'translateX(100%)' : 'none'};
    
    /* 색상 */
    background: ${oc.blue[6]};
`;

const Item = ({children, onSelect, name}) => (
    <StyledItem onClick={() => onSelect(name)}>
        {children}
    </StyledItem>
);


const FirstBtn = ({children, step, type, handleCreateCropBox}) => {

    return (
        <StyledFirstButton step={step} type={type} onClick={handleCreateCropBox}>{children}</StyledFirstButton>
    )
};

const SecondBtn = ({step, cropType, handleTypeSelect}) => {

    return (
        <StyledSecondButton step={step}>
            <TypeButtons>
                <Item onSelect={handleTypeSelect} name="he5">he5</Item>
                <Item onSelect={handleTypeSelect} name="nc">NetCDF</Item>
                <Bar right={cropType === 'nc'}/>
            </TypeButtons>
            &nbsp;
            <MakeButtons>
                <MakeButtonOK><OkIcon/></MakeButtonOK>
                <MakeButtonNO><NoIcon/></MakeButtonNO>
            </MakeButtons>
        </StyledSecondButton>
    )
};

const ThirdBtn = ({children, step}) => {

    return (
        <StyledThirdButton step={step}>{children}</StyledThirdButton>
    )
};

class ValueView extends Component {

    render() {
        const {type, step, cropType, handleTypeSelect, handleCreateCropBox} = this.props;

        return (
            <Wrapper>
                <FirstBtn handleCreateCropBox={handleCreateCropBox} step={step}
                          type={type}>{type === 'RGB' ? 'ㄴㄴ' : 'Create the crop box'}</FirstBtn>
                <SecondBtn step={step} cropType={cropType} handleTypeSelect={handleTypeSelect}>Flex</SecondBtn>
                <ThirdBtn step={step}>Download</ThirdBtn>
            </Wrapper>
        );
    }
}

export default ValueView;
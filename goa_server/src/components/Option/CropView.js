import React, {Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';
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

const StyledThirdButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    color: white;
    transition: all .2s;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.10);
    width: 100%;
    height: 2rem;
    cursor: ${props => props.step === 3 ? 'pointer' : 'no-drop'};
    background: ${props => props.step === 3 ? oc.blue[7] : oc.gray[4]};

    ${props => props.step === 3 ? '&:hover{background:#1b6ec2;}' : ''}
    
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
    transition: all .2s;
    height: 2rem;
    cursor: ${props => props.step === 2 ? 'pointer' : 'no-drop'};

    color: white;
    background: ${props => props.step === 2 ? '#37b24d' : oc.gray[4]};

    ${props => props.step === 2 ? '&:hover{background:#40c057;}' : ''}

`;
const MakeButtonNO = styled.div`
    flex: 1;
    display: flex;
    transition: all .2s;
    align-items: center;
    justify-content: center;
    height: 2rem;
    cursor: ${props => props.step === 2 ? 'pointer' : 'no-drop'};
    
    color: white;
    background: ${props => props.step === 2 ? '#f03e3e' : oc.gray[4]};

     ${props => props.step === 2 ? '&:hover{background:#fa5252;}' : ''}

`;

const TypeButtons = styled.div`
    background: white;
    flex: 3;
    display: flex;
    position: relative;
`;

const StyledItem = styled.div`

    flex: 1; 
    cursor: ${props => props.step === 2 ? 'pointer' : 'no-drop'};
    transition: all .2s;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    
    color: ${oc.gray[9]};
    background: ${props => props.step === 2 ? 'white' : oc.gray[4]};
    color: ${props => props.step === 2 ? oc.gray[9] : 'white'};


    /* 기타 */
    font-size: 1rem;

    /* 마우스가 위에 있을 때 */
     ${props => props.step === 2 ? '&:hover{background:'+oc.gray[0]+';}' : ''}

`;

const Bar = styled.div`
    /* 레이아웃 */
    position: absolute;
    bottom: 0px;
    height: 4px;
    width: 50%;
    transition: all .2s;
    transform: ${props => props.right ? 'translateX(100%)' : 'none'};
    
    background: ${props => props.step === 2 ? oc.blue[6] : oc.gray[4]};
`;

const Item = ({children,step, onSelect, name}) => (
    <StyledItem step={step} onClick={() => onSelect(name)}>
        {children}
    </StyledItem>
);


const FirstBtn = ({children, step, type, handleCreateCropBox}) => {

    return (
        <StyledFirstButton step={step} type={type} onClick={handleCreateCropBox}>{children}</StyledFirstButton>
    )
};

const SecondBtn = ({step, cropType, handleCreateProduct, handleCancelProduct, handleTypeSelect}) => {

    return (
        <StyledSecondButton step={step}>
            <TypeButtons step={step}>
                <Item onSelect={handleTypeSelect} step={step} name="he5">he5</Item>
                <Item onSelect={handleTypeSelect} step={step} name="nc">NetCDF</Item>
                <Bar step={step} right={cropType === 'nc'}/>
            </TypeButtons>
            &nbsp;
            <MakeButtons step={step}>
                <MakeButtonOK step={step} onClick={handleCreateProduct}><OkIcon/></MakeButtonOK>
                <MakeButtonNO step={step} onClick={handleCancelProduct}><NoIcon/></MakeButtonNO>
            </MakeButtons>
        </StyledSecondButton>
    )
};

const ThirdBtn = ({children, handleDownload, step}) => {

    return (
        <StyledThirdButton step={step} onClick={handleDownload}>{children}</StyledThirdButton>
    )
};

class ValueView extends Component {

    render() {
        const {type, step, handleDownload, handleCreateProduct, handleCancelProduct, cropType, handleTypeSelect, handleCreateCropBox} = this.props;

        return (
            <Wrapper>
                <FirstBtn handleCreateCropBox={handleCreateCropBox}
                          step={step}
                          type={type}>{type === 'RGB' ? 'Change Type' : 'Create the crop box'}</FirstBtn>
                <SecondBtn step={step}
                           cropType={cropType}
                           handleCreateProduct={handleCreateProduct}
                           handleCancelProduct={handleCancelProduct}
                           handleTypeSelect={handleTypeSelect}>Flex</SecondBtn>
                <ThirdBtn step={step} handleDownload={handleDownload}>Download</ThirdBtn>
            </Wrapper>
        );
    }
}

export default ValueView;
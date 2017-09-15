import React, {Component} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'react-select/dist/react-select.css';

const Wrapper = styled.div`
    height: 68px;
    padding: 1rem;
    border-bottom: 1px solid #bcbcbc;
`;

class TypeSelector extends Component {
    state = {
        options: [
            {value: 'RGB', label: 'RGB', clearableValue: false},
            {value: 'TSS', label: 'TSS', clearableValue: false},
            {value: 'CDOM', label: 'CDOM', clearableValue: false},
            {value: 'CHL', label: 'CHL', clearableValue: false}
        ]
    };

    static defaultProps = {
        onChange: (val) => console.log('Selected!', JSON.stringify(val)),
        value: 'RGB'
    };

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string
    };

    render() {
        const {value, onChange} = this.props;
        const {options} = this.state;

        return (
            <Wrapper>
                <Select
                    placeholder="Type"
                    name="productType"
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </Wrapper>
        );
    }
}

export default TypeSelector;
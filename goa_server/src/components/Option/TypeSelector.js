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
            {value: 'RGB', label: 'RGB'},
            {value: 'TSS', label: 'TSS'},
            {value: 'CDOM', label: 'CDOM'},
            {value: 'CHL', label: 'CHL'}
        ]
    };

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string
    };

    handleChange = (value) => {
        const {onChange} = this.props;
        onChange({name: 'type', value: value.value});
    };

    render() {
        return (
            <Wrapper>
                <Select
                    placeholder="Type"
                    name="productType"
                    value={this.props.type}
                    options={this.state.options}
                    onChange={this.handleChange}
                    searchable={false}
                    clearable={false}
                />
            </Wrapper>
        );
    }
}

export default TypeSelector;
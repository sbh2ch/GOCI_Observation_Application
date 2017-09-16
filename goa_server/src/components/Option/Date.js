/**
 * Created by sonbyeonghwa on 2017. 9. 14..
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import PickDate from './PickDate';
import PickTime from './PickTime';

const Wrapper = styled.div`
    height: 102px;
    padding: .7rem;
    width: 100%;
    background: ${oc.gray[3]};
    border-bottom: 1px solid #bcbcbc;
`;


class Date extends Component {
    render() {
        const {map, year, type, month, day, time, isOpen, onToggle, onTimeChange, getMapType} = this.props;

        return (
            <Wrapper>
                <PickDate
                    type={type}
                    time={time}
                    map={map}
                    year={year}
                    month={month}
                    day={day}
                    isOpen={isOpen}
                    onTimeChange={onTimeChange}
                    onToggle={onToggle}
                    getMapType={getMapType}
                />
                <PickTime
                    type={type}
                    time={time}
                    map={map}
                    year={year}
                    month={month}
                    day={day}
                    getMapType={getMapType}
                    onTimeChange={onTimeChange}/>
            </Wrapper>
        )
    }
}

Date.propTypes = {
    getMapType: PropTypes.func,
    type: PropTypes.string,
    map: PropTypes.object,
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
    time: PropTypes.string,
    onTimeChange: PropTypes.func,
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func,
};

export default Date;
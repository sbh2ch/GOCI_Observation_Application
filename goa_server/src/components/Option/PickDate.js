/**
 * Created by sonbyeonghwa on 2017. 9. 14..
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import LeftIcon from 'react-icons/lib/go/chevron-left';
import RightIcon from 'react-icons/lib/go/chevron-right';
import CalendarIcon from 'react-icons/lib/go/calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './DateIcon.css';
import 'react-datepicker/dist/react-datepicker.css';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const StyledSelectedDate = styled.a`
    padding-left: .3rem;
    padding-right: .8rem;
    color: ${oc.gray[9]};
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 1.5rem;
`;

const SelectedDate = ({year, month, day}) => (
    <StyledSelectedDate>{year}.{month}.{day}</StyledSelectedDate>
);

SelectedDate.propTypes = {
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string
};

class PickDate extends Component {
    toggleCalendar = () => {
        this.props.onToggle();
    };

    handleChange = (date) => {
        const {onTimeChange, onToggle, time, map, getMapType, type} = this.props;
        const naver = window.naver;
        const year = date.format('YYYY'),
            month = date.format('MM'),
            day = date.format('DD');


        onTimeChange({name: 'year', value: year});
        onTimeChange({name: 'month', value: month});
        onTimeChange({name: 'day', value: day});

        map.setOptions('mapTypes', new naver.maps.MapTypeRegistry({
            'RGB': getMapType(type, year, month, day, time),
        }));

        onToggle();
    };

    handleDayButton = (value) => {
        const {onTimeChange, year, month, day, time, map, getMapType, type} = this.props;
        const changedDay = moment(`${year}-${month}-${day}`).add(value, 'days');
        const naver = window.naver;

        onTimeChange({name: 'year', value: changedDay.format('YYYY')});
        onTimeChange({name: 'month', value: changedDay.format('MM')});
        onTimeChange({name: 'day', value: changedDay.format('DD')});

        map.setOptions('mapTypes', new naver.maps.MapTypeRegistry({
            'RGB': getMapType(type, changedDay.format('YYYY'), changedDay.format('MM'), changedDay.format('DD'), time),
        }));
    };

    render() {
        const {toggleCalendar, handleChange, handleDayButton} = this;
        const {year, month, day, isOpen} = this.props;

        return (
            <Wrapper>
                <LeftIcon
                    size={25}
                    className="date_icon"
                    onClick={() => {
                        handleDayButton(-1)
                    }}/>
                <SelectedDate
                    year={year}
                    month={month}
                    day={day}/>
                <CalendarIcon
                    size={16}
                    className="date_icon"
                    style={{marginTop: '.5px', marginRight: '3px'}}
                    onClick={toggleCalendar}
                />
                {
                    isOpen && (
                        <DatePicker
                            onChange={handleChange}
                            startDate={moment()}
                            withPortal
                            inline
                        />
                    )
                }
                <RightIcon
                    size={25}
                    className="date_icon"
                    onClick={() => {
                        handleDayButton(1)
                    }}/>
            </Wrapper>
        );
    }
}

PickDate.propTypes = {
    getMapType: PropTypes.func,
    type: PropTypes.string,
    map: PropTypes.object,
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
    isOpen: PropTypes.bool,
    onTimeChange: PropTypes.func,
    onToggle: PropTypes.func
};


export default PickDate;
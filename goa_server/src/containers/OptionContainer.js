import React, {Component} from 'react';
import * as uiActions from '../modules/ui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Option from '../components/Option/Option';
import Layout from '../components/Layout';
import Date from '../components/Option/Date';
import TypeSelector from "../components/Option/TypeSelector";
import ValueView from '../components/Option/ValueView';
import Footer from '../components/Footer';

class OptionContainer extends Component {
    handleTimeChange = (val) => {
        const {changeInfo} = this.props.UIActions;

        changeInfo(val);
    };

    handleToggle = () => {
        const {toggleDate} = this.props.UIActions;
        toggleDate();
    };

    render() {
        const {handleTimeChange, handleToggle} = this;

        const {year, month, day, time, type, isDatePickerOpen, UIActions} = this.props;
        return (
            <Option>
                <Layout.Title style={{borderBottom: `1px solid #bcbcbc`}}>
                    Real Time Satellite Image
                </Layout.Title>
                <Date
                    year={year}
                    month={month}
                    day={day}
                    time={time}
                    isOpen={isDatePickerOpen}
                    onTimeChange={handleTimeChange}
                    onToggle={handleToggle}/>
                <TypeSelector type={type} onChange={handleTimeChange}/>
                <ValueView/>
                <Footer/>
            </Option>
        )
    }
}

export default connect((state) => ({
        year: state.ui.getIn(['info', 'year']),
        month: state.ui.getIn(['info', 'month']),
        day: state.ui.getIn(['info', 'day']),
        time: state.ui.getIn(['info', 'time']),
        type: state.ui.getIn(['info', 'type']),
        lat: state.ui.getIn(['info', 'selected', 'lat']),
        lon: state.ui.getIn(['info', 'type', 'lon']),
        value: state.ui.getIn(['info', 'type', 'value']),
        option: state.ui.get('option'),
        isDatePickerOpen: state.ui.get('isDatePickerOpen')
    }), (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(OptionContainer);
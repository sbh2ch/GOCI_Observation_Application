import React, {Component} from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import MenuSelector from '../components/Menu/menuSelector';
import MapContainer from '../containers/MapContainer';
import OptionContainer from './OptionContainer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from '../modules/ui';

class App extends Component {

    handleMenuClick = (current, next) => {
        const {setMenu} = this.props.UIActions;
        if (current === next)
            return;

        setMenu(next);
    };

    render() {
        const {mode} = this.props;

        return (
            <Layout>
                <Header/>
                <Layout.Main>
                    <MenuSelector mode={mode} handleMenuClick={this.handleMenuClick}/>
                    <OptionContainer/>
                    <Layout.Map>
                        <Layout.Title style={{
                            justifyContent: 'flex-start',
                            paddingLeft: '1rem',
                            background: '#373b46',
                            color: '#fefefe'
                        }}>
                            {this.props.type} Image
                        </Layout.Title>
                        <MapContainer/>
                    </Layout.Map>
                </Layout.Main>
            </Layout>
        );
    };
}

export default connect((state) => ({
    type: state.ui.getIn(['info', 'type']),
    mode: state.ui.get('mode'),
}), (dispatch) => ({
    UIActions: bindActionCreators(uiActions, dispatch)
}))(App);
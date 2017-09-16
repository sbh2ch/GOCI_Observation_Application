import React, {Component} from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import MenuSelector from '../components/Menu/menuSelector';
import MapContainer from '../containers/MapContainer';
import OptionContainer from './OptionContainer';
import {connect} from 'react-redux';

class App extends Component {

    render() {

        return (
            <Layout>
                <Header/>
                <Layout.Main>
                    <MenuSelector/>
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
    type: state.ui.getIn(['info', 'type'])
}))(App);
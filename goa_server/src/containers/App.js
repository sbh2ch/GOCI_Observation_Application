import React, {Component} from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import MenuSelector from '../components/Menu/menuSelector';
import Date from '../components/Date/Date';
import MapContainer from '../containers/MapContainer';
class App extends Component {

    render() {

        return (
            <Layout>
                <Header/>
                <Layout.Main>
                    <MenuSelector/>
                    <Layout.Option>
                        <Layout.Title style={{border: `1px solid #bcbcbc`}}>
                            Real Time Satellite Image
                        </Layout.Title>
                        <Date/>
                    </Layout.Option>
                    <Layout.Map>
                        <Layout.Title style={{
                            justifyContent: 'flex-start',
                            paddingLeft: '1rem',
                            background: '#373b46',
                            color: '#fefefe'
                        }}>
                            Chlorophyll Image
                        </Layout.Title>
                        <MapContainer/>
                    </Layout.Map>
                </Layout.Main>
            </Layout>
        );
    };
}

export default App;
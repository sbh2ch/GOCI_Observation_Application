import React, {Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    height: 2rem;
    width: 100%;
    flex: 10;
    font-weight: 300;
    letter-spacing: 0.01em;
`;

const Map = () => (
    <Wrapper>
        <div id="map" style={{width: '100%', height: '100%'}} ref={ref => this.mapDiv = ref}>

        </div>
    </Wrapper>
);

export default Map;
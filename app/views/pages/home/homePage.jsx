import React from 'react';
import DefaultLayout from '../../layouts/default';
import HomeView from './homeView';

const scripts = [
    '/public/js/home.js'
];

class HomePage extends React.Component {
    render() {

        return (
            <DefaultLayout {...this.props} scripts={ scripts }>
                <HomeView {...this.props} />
            </DefaultLayout>
        );
    }
}

module.exports = HomePage;

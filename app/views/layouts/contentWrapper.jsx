import React from 'react';

class ContentWrapper extends React.Component {

    render() {
        return (
            <div className="page-wrapper">
                { this.props.children }
            </div>
        );
    }
}

module.exports = ContentWrapper;
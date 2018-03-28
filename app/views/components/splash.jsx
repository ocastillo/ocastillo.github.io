const React = require('react');

class Splash extends React.Component {
    render() {
        return (
            <div className="splash-container">
                <div className="splash">
                    <h1 className="splash-head">EscapedPet.com</h1>
                    <p className="splash-subhead">
                        Helping owners find their escaped pets.
                    </p>
                    <form className="pure-form" action="/search" method="GET">
                        <fieldset>
                            <input type="text" name="location" placeholder="Search by Zip" />
                            <button type="submit" className="pure-button pure-button-primary home-search">Search</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

module.exports = Splash;
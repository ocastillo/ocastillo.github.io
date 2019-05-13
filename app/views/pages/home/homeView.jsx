import React from 'react';
import ReactDOM from 'react-dom';
import ContentWrapper from '../../layouts/contentWrapper';

class HomeView extends React.Component {
    render() {
        return (
            <ContentWrapper {...this.props}>
                
                <section className="banner">
                    <div className="title">
                        <h1>Orlando Castillo</h1>
                        <p>Web developer</p>
                    </div>
                </section>
                <section className="summary">
                    <h2>Background</h2>
                    <p>For almost 20 years, I have been building websites and web apps for
                    government agencies, organizations, start-ups, individuals, and businesses large
                    and small.</p>
                </section>
                <section className="highlights">
                    <div className="container">
                        <div className="box content">
                            <h2>What I Do</h2>
                            <p>I currently work for <a href="https://www.macmillanlearning.com" target="job">Macmillan Learning</a>. 
                                As a member of Macmillan's engineering team, I
                                work on the full stack using technologies like Node.js, React, PHP, and MySQL.</p>
                            <p>I also provide related services such as consulting and free-lance development
                                when time allows. You can find me on 
                                on <a href="https://www.linkedin.com/in/orlando-castillo-72897a1" target="linkedin_window">LinkedIn</a>.</p>
                        </div>
                        <div className="box image my-tools">
                            <div className="tool"><i className="fab fa-js-square"></i></div>
                            <div className="tool"><i className="fab fa-node"></i></div>
                            <div className="tool"><i className="fab fa-php"></i></div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="box content">
                            <h2>I am Orlando</h2>
                            <p>Being with my family is my favorite thing to do.  I also enjoy being outside 
                                whether it be working in the yard, hiking, biking, or playing soccer.</p>
                        </div>
                        <div className="box image"><img src="/public/images/me.jpg" alt="Photo of Orlando Castillo" /></div>
                    </div>
                </section>
                <section className="contact">
                    <h2>Contact Me</h2>
                    <div className="contact-link">
                        <a href="https://www.linkedin.com/in/orlando-castillo-72897a1" target="linkedin_window">
                          <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </section>
                <footer>
                    <div>&copy; 2019 test Orlando Castillo</div>
                    <div className="linkedin">
                        <a href="https://www.linkedin.com/in/orlando-castillo-72897a1" aria-label="Orlando on LinkedIn" target="linkedin_window"><i className="fab fa-linkedin"></i></a>
                    </div>
                </footer>

            </ContentWrapper>
        );
    }
}

if(typeof window !== 'undefined') {
    ReactDOM.hydrate(<HomeView />, document.getElementById('oc-app'));
}

module.exports = HomeView;

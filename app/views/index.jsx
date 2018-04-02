const React = require('react');
const DefaultLayout = require('./layouts/default');

class HelloMessage extends React.Component {
    render() {
        const scripts = [
            '/static/js/main.bundle.js'
        ];

        return (
            <DefaultLayout {...this.props}>

                <div className="page-wrapper">
                    <section className="banner">
                        <div className="title">
                            <h1>Orlando Castillo</h1>
                            <p>Web developer since 1999</p>
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
                                <p>I currently work for <a href="https://www.saatva.com" target="saatva">Saatva</a>, 
                                    an online high quality mattress company.  I am a member of Saatva's engineering team
                                    working on the full stack using technologies like Node.js, React, PHP, and MySQL.</p>
                                <p>I also provide related services such as consulting and free-lance development
                                    when time allows. You can find me on 
                                    on <a href="https://www.linkedin.com/in/orlando-castillo-72897a1" target="linkedin_window">LinkedIn</a> or
                                    using the contact form below.</p>
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
                            <div className="box image"><img data-src="/static/images/me.jpg" alt="Photo of Orlando Castillo" /></div>
                        </div>
                    </section>
                    <section className="contact">
                        <h2>Contact Me</h2>
                        <div id="contact-form" className="contact-form">
                            <form>
                                <input type="text" name="field1" placeholder="Your Name" />
                                <input type="email" name="field2" placeholder="Email Address" />
                                <textarea name="message" placeholder="Type your Message"></textarea>
                                <input type="submit" value="Send" />
                            </form>
                        </div>
                    </section>
                    <footer>
                        <div>&copy; 2018 Orlando Castillo</div>
                        <div className="linkedin">
                            <a href="https://www.linkedin.com/in/orlando-castillo-72897a1" aria-label="Orlando on LinkedIn" target="linkedin_window"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </footer>
                </div>
            </DefaultLayout>
        );
    }
}

module.exports = HelloMessage;
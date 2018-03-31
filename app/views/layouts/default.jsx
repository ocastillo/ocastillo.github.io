const React = require('react')

class DefaultLayout extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const scripts = this.props.scripts || []
        const scriptItems = scripts.map((script, i) =>
            <script src={ script } type={'text/javascript'} key={ i }></script>
        )

        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="Description" content="Orlando Castillo. Web Developer from Austin, TX" />
                    <title>Orlando Castillo - I build websites and webapps. From Austin, TX</title>
                    { this.props.headerCss &&
                        <style dangerouslySetInnerHTML={{ __html: this.props.headerCss }} />
                    }
                </head>
                <body>
                    { this.props.children }
                    { scriptItems }
                </body>
            </html>
        )
    }
}

module.exports = DefaultLayout
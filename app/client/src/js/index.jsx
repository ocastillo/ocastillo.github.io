import React from 'react'
import {render} from 'react-dom'
import ContactForm from './components/contactForm.jsx'

class App extends React.Component {
  render () {
    return (
      <ContactForm />
    )
  }
}

render(<App/>, document.getElementById('contact-form'))
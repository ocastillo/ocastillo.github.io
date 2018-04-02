import React from 'react'
import {render} from 'react-dom'
import ContactForm from './components/contactForm.jsx'

[].forEach.call(document.querySelectorAll('img[data-src]'),    function(img) {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = function() {
    img.removeAttribute('data-src');
  };
});

class App extends React.Component {
  render () {
    return (
      <ContactForm />
    )
  }
}

render(<App/>, document.getElementById('contact-form'))
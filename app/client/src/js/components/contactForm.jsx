import React from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'

const FormError = (props) => {
  return <div className="form-error">{ props.children }</div>;
}

class ContactForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)

    this.state = {
      formData: {
        contact_name: '',
        contact_email: '',
        message: ''
      },
      errors: {
        form: null,
        contact_name: null,
        contact_email: null,
        message: null
      }
    }
  }

  validateAll () {
    console.log('validating...')
    this.validateEmail(this.state.formData.contact_email)
    this.validateRequired('contact_name', this.state.formData.contact_name)
    this.validateRequired('message', this.state.formData.message)
    console.log('done')
  }

  validateEmail (email) {
    const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    const newState = Object.assign({}, this.state)
    newState.errors['contact_email'] = null
    if(!re.test(email)) {
      newState.errors['contact_email'] = 'Please enter a valid email'
    }
    this.setState(newState)
  }

  validateRequired (field, fieldData) {
    const newState = Object.assign({}, this.state)
    newState.errors[field] = null
    if(!fieldData) {
      newState.errors[field] = 'This field is required.'
      this.setState(newState)
    }
  }

  handleFieldChange (event) {
    const newState = Object.assign({}, this.state)
    newState.formData[event.target.name] = event.target.value
    this.setState(newState);
    if(event.target.name === 'contact_email') {
      this.validateEmail(event.target.value)
    } else {
      this.validateRequired(event.target.name, event.target.value)
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    this.validateAll()

    if(this.state.errors.form
      || this.state.errors.contact_name
      || this.state.errors.contact_email
      || this.state.errors.message) {
        return false
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.formData)
    }

    fetch('/contact', fetchOptions)
      .then(response => {
        if(response.status !== 200) {
          throw new Error('Something went wrong. Please try again')
        }
        return response.json()
      }).then(data => {
        console.log(data)
      }).catch(err => {
        console.log(err)
        this.setState({
          errors: {
            form: err.message
          }
        })
      })
  }

  render () {
    return (
      <form onSubmit={ this.handleSubmit }>
        {this.state.errors.form &&
          <FormError>{ this.state.errors.form }</FormError>
        }
        <input type="text" name="contact_name" placeholder="Your Name" onChange={ this.handleFieldChange } />
        {this.state.errors.contact_name &&
          <FormError>{ this.state.errors.contact_name }</FormError>
        }
        <input type="email" name="contact_email" placeholder="Email Address" onChange={ this.handleFieldChange } />
        {this.state.errors.contact_email &&
          <FormError>{ this.state.errors.contact_email }</FormError>
        }
        <textarea name="message" placeholder="Type your Message" onChange={ this.handleFieldChange }></textarea>
        {this.state.errors.message &&
          <FormError>{ this.state.errors.message }</FormError>
        }
        <input type="submit" value="Send" />
      </form>
    )
  }
}

module.exports = ContactForm
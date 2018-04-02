import React from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import Recaptcha from 'react-google-recaptcha'

const initialState = {
  complete: false,
  recaptchaValue: null,
  formData_contact_name: '',
  formData_contact_email: '',
  formData_contact_subject: '',
  formData_message: '',
  errors_form: null,
  errors_contact_name: null,
  errors_contact_email: null,
  errors_contact_subject: null,
  errors_message: null
}

const FormError = props => {
  return <div className="form-error">{ props.children }</div>
}

const FormSuccess = props => {
  return <div className="form-success">{ 'Message sent. Thank you!' }</div>
}

class ContactForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.state = JSON.parse(JSON.stringify(initialState))
  }

  clearFormError () {
    this.setState((prevState, props) => ({
      errors_form: null,
      complete: false
    }))
  }

  handleSuccess () {
    const newState = JSON.parse(JSON.stringify(initialState))
    newState.complete = true
    grecaptcha.reset()
    this.setState(newState)
  }

  validateAll () {
    this.validateRecaptcha(this.state.recaptchaValue)
    this.validateEmail(this.state.formData_contact_email)
    this.validateRequired('contact_subject', this.state.formData_contact_subject)
    this.validateRequired('contact_name', this.state.formData_contact_name)
    this.validateRequired('message', this.state.formData_message)
  }

  validateRecaptcha (rValue) {
    const formError = this.state.recaptchaValue === null ? 'Please verify that you are human' : null
    this.setState((prevState, props) => ({
      errors_form: formError
    }))
  }

  validateEmail (email) {
    const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    const emailError = re.test(email) ? null : 'Please enter a valid email'
    this.setState((prevState, props) => ({
      errors_contact_email: emailError
    }))
  }

  validateRequired (field, fieldData) {
    const fieldError = (fieldData.length) ? null : 'This field is required'
    const newState = {}
    newState['errors_' + field] = fieldError
    this.setState((prevState, props) => newState)
  }

  handleFieldChange (event) {
    const newState = {}
    newState['formData_' + event.target.name] = event.target.value
    this.setState((prevState, props) => newState)

    if(event.target.name === 'contact_email') {
      this.validateEmail(event.target.value)
    } else {
      this.validateRequired(event.target.name, event.target.value)
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    this.clearFormError()
    this.validateAll()

    if( !this.state.recaptchaValue
      || this.state.errors_contact_name
      || this.state.errors_contact_email
      || this.state.errors_contact_subject
      || this.state.errors_message) {
        return false
    }

    const postData = {
      contact_name: this.state.formData_contact_name,
      contact_email: this.state.formData_contact_email,
      contact_subject: this.state.formData_contact_subject,
      message: this.state.formData_message
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }

    fetch('/contact', fetchOptions)
      .then(response => {
        if(response.status !== 200) {
          throw new Error('Something went wrong. Please try again')
        }
        return response.json()
      }).then(data => {
        this.handleSuccess()
      }).catch(err => {
        console.log(err)
        this.setState((prevState, props) => ({
          errors_form: err.message
        }))
      })
  }

  recaptchaCallback (rValue) {
    this.setState((prevState, props) => ({
      recaptchaValue: rValue
    }))
    this.validateRecaptcha(rValue)
  }

  render () {
    return (
      <form onSubmit={ this.handleSubmit }>
        {this.state.errors_form &&
          <FormError>{ this.state.errors_form }</FormError>
        }
        {this.state.complete &&
          <FormSuccess />
        }
        <input type="text" name="contact_name" aria-label="Your Name" value={ this.state.formData_contact_name } placeholder="Your Name" onChange={ this.handleFieldChange } />
        {this.state.errors_contact_name &&
          <FormError>{ this.state.errors_contact_name }</FormError>
        }
        <input type="email" name="contact_email" aria-label="Your Email Address" value={ this.state.formData_contact_email } placeholder="Your Email Address" onChange={ this.handleFieldChange } />
        {this.state.errors_contact_email &&
          <FormError>{ this.state.errors_contact_email }</FormError>
        }
        <input type="text" name="contact_subject" aria-label="Message Subject" value={ this.state.formData_contact_subject } placeholder="Subject" onChange={ this.handleFieldChange } />
        {this.state.errors_contact_subject &&
          <FormError>{ this.state.errors_contact_subject }</FormError>
        }
        <textarea name="message" aria-label="Your Message" value={ this.state.formData_message } placeholder="Type your Message" onChange={ this.handleFieldChange }></textarea>
        {this.state.errors_message &&
          <FormError>{ this.state.errors_message }</FormError>
        }
        <div className="o-recaptcha">
          <Recaptcha 
            sitekey="6Ld-k08UAAAAAFVi19wMXcyNgnnsqpoXqZHpiOVS" 
            ref="recaptcha" 
            size="compact"
            onChange={ rValue => this.recaptchaCallback(rValue) }
          />
          </div>
        <input type="submit" value="Send" />
      </form>
    )
  }
}

module.exports = ContactForm
import React from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'

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

  handleFieldChange (event) {
    const newState = Object.assign({}, this.state)
    newState.formData[event.target.name] = event.target.value
    this.setState(newState);
  }

  handleSubmit (event) {
    event.preventDefault()

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
          <div>{ this.state.errors.form }</div>
        }
        <input type="text" name="contact_name" placeholder="Your Name" onChange={ this.handleFieldChange } />
        {this.state.errors.contact_name &&
          <div>{ this.state.errors.contact_name }</div>
        }
        <input type="email" name="contact_email" placeholder="Email Address" onChange={ this.handleFieldChange } />
        {this.state.errors.contact_email &&
          <div>{ this.state.errors.contact_email }</div>
        }
        <textarea name="message" placeholder="Type your Message" onChange={ this.handleFieldChange }></textarea>
        {this.state.errors.message &&
          <div>{ this.state.errors.message }</div>
        }
        <input type="submit" value="Send" />
      </form>
    )
  }
}

module.exports = ContactForm
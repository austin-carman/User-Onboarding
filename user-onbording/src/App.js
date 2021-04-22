import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import User from './components/User'
import './App.css';
import axios from 'axios'
import * as yup from 'yup'
import schema from './components/Schema'


const initialFormValue = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: '',
}
const initialUsers = [];
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: '',
}
const initialDisabled = true

function App() {
  const [formValues, setFormValues] = useState(initialFormValue);
  const [users, setUsers] = useState(initialUsers)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)


  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users')
      .then(res => {
        setUsers([...users, newUser])
        setFormValues(initialFormValue)
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    
  }

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })

    setFormValues({...formValues, [name]: value})
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      confirmPassword: formValues.confirmPassword.trim(),
      terms: formValues.terms,
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  },[formValues])


  return (
    <div className='app-container'>
      <h1>New User</h1>
      <Form values={formValues} change={inputChange} submit={formSubmit} disabled={disabled} errors={formErrors} />
      {
        users.map((user, index) => {
          return <User key={index} details={user} />
        })
      }
    </div>
    
  )
}

export default App;

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

function App() {  // step 1: slices of state
  const [formValues, setFormValues] = useState(initialFormValue); // formValues is what the user enters/selects in the form
  const [users, setUsers] = useState(initialUsers) // this will be the users from the api rendered to the Dom
  const [formErrors, setFormErrors] = useState(initialFormErrors) // yup used to validate then set errors to display
  const [disabled, setDisabled] = useState(initialDisabled) // this is to disable button until all formValues are completed


  const postNewUser = newUser => { // step 8: post new data from user form to the api, changing user state to the data from api, resetting the from values
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([...users, res.data])
        setFormValues(initialFormValue)
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      }) 
  }

  const inputChange = (name, value) => { // step 6: pass in arguments from change function in step 4. Validate forms using yup
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

  const formSubmit = () => { // step 7: upon submitting, build out the structure for new data. Invoke function to post to API
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


  return ( // step 2: begin rendering the form/JSX and pass in needed props
    <div className='app-container'>
      <h1>New User</h1>
      <Form values={formValues} change={inputChange} submit={formSubmit} disabled={disabled} errors={formErrors} />
      {
        users.map((user, index) => {
          return <User key={index} details={user} />
        })
      }
      {/* {/* <pre>{JSON.stringify(users)}</pre> */}
    </div>
    
  )
}

export default App;

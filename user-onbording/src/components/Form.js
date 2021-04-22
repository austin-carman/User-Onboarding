import React from 'react'


export default function Form(props) { // step 3: props and build out the form in JSX portion
    const { values, submit, change, errors, disabled } = props

    const toChange = (evt) => { //step 4: change function to handle onChange event.
        const { name, value, type, checked } = evt.target
        const inputValue = type === 'checkbox' ? checked : value
        change(name, inputValue)
    }

    const toSubmit = (evt) => { // step 5: prevent default for submit button to refresh the page. Call submit function
        evt.preventDefault()
        submit()
    }


    return(
        <form className= 'form' onSubmit={toSubmit}>
            <div className='inputs'>
                <label className='label'> Name:
                    <input
                        type='text'
                        name='name'
                        value={values.name}
                        onChange={toChange}
                        placeholder='Name'
                        />
                </label>

                <label className='label'> Email:
                    <input
                        type='email'
                        name='email'
                        value={values.email}
                        onChange={toChange}
                        placeholder='Email'
                        />
                </label>

                <label className='label'> Password:
                    <input
                        type='text'
                        name='password'
                        value={values.password}
                        onChange={toChange}
                        placeholder='Password'
                        />
                </label>

                <label className='label'> Confirm Password:
                    <input
                        type='text'
                        name='confirmPassword'
                        value={values.confirmPassword}
                        onChange={toChange}
                        placeholder='Confirm Password'
                        />
                </label>

                <label className='checkbox'> 
                    <input
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                        onChange={toChange}
                    />
                    Agree to Terms of Service
                </label>
                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>
                <button className='submit-form' disabled={disabled}>Submit</button>
            </div>
        </form>
    )
}
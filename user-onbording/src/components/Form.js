import React from 'react'


export default function Form(props) {
    const { values, submit, change, errors, disabled } = props

    const toChange = (evt) => {
        const { name, value, type, checked } = evt.target
        const inputValue = type === 'checkbox' ? checked : value
        change(name, inputValue)
    }

    const toSubmit = (evt) => {
        evt.preventDefault()
        submit()
    }


    return(
        <form onSubmit={toSubmit}>
            <div>
                <label> Name:
                    <input
                        type='text'
                        name='name'
                        value={values.name}
                        onChange={toChange}
                    />
                </label>
                <label> Email:
                    <input
                        type='email'
                        name='email'
                        value={values.email}
                        onChange={toChange}
                    />
                </label>
                <label> Password:
                    <input
                        type='text'
                        name='password'
                        value={values.password}
                        onChange={toChange}
                    />
                </label>
                <label> 
                    <input
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                        onChange={toChange}
                    />
                    Agree to Terms of Service
                </label>
                <button disabled={disabled}>Submit</button>
                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>
            </div>
        </form>
    )
}
import React from 'react'

export default function User(props) {
    const { details } = props
    return(
        <div className='user-card'>
            <h2>Name: {details.name}</h2>
            <p>Email: {details.email}</p>
            <p>Password: {details.password}</p>
        </div>
    )
}
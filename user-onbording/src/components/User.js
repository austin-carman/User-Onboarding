import React from 'react'

export default function User(props) {
    const { details } = props
    return(
        <div>
            <p>{details.name}</p>
        </div>
    )
}
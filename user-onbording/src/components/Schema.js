import * as yup from 'yup'

export default yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .min(1, 'Name must be at least 1 character'),
    email: yup
        .string()
        .email('must be a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(5, 'Password must contain at least 5 characters'),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .min(5, 'Password must contain at least 5 characters')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    terms: yup
        .boolean()
        .oneOf([true], 'Please accept terms to submit')
})

import React from 'react'
import { signUp } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setErrorNotification, setSuccessNotification } from '../reducers/notificationReducer'
import { useHistory } from "react-router-dom"
import { Container, TextField, Button } from '@material-ui/core'

const SignupForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSignup = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const name = event.target.name.value
        const password = event.target.password.value
        const ckeckpassword = event.target.checkpassword.value
        if (password !== ckeckpassword){
            dispatch(setErrorNotification('Passwords do not match. Please check again.', 5))
        }else{
            dispatch(signUp(username, name, password)).then(() => {
                dispatch(setSuccessNotification('Sign up succussfully. Go to login.', 5))
            })
            .catch(error => {
                dispatch(setErrorNotification(error.response.data.error, 5))
            })
        }
        history.push('/signup')
    }

    return (
        <div>
            <h2>Signup to application</h2>
            <Container>
                <form onSubmit={handleSignup}>
                    <div>
                        <TextField required label="Username" placeholder="username for login" variant="outlined" margin="dense" 
                        id='username' type="text" name="username"/>
                    </div>
                    <div>
                        <TextField required label="Name" placeholder="name for blogs" variant="outlined" margin="dense" id='name' 
                            type="text" name="name"/>
                    </div>
                    <div>
                        <TextField required label="Password" placeholder="password" variant="outlined" margin="dense" id='password' 
                            type="password" name="password"/>
                    </div>
                    <div>
                        <TextField required label="Check password" placeholder="check your password" variant="outlined" margin="dense" 
                        id='checkpassword' type="password" name="checkpassword"/>
                    </div>
                    <Button variant="contained" color="primary" id="signup-button" type="submit">signup</Button>
                </form>
            </Container>
        </div>
    )
}

export default SignupForm
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginForm from '../Components/LoginForm'
import SignupForm from '../Components/SignupForm'
import axios from 'axios';

class AuthContainer extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        })
    }

    signupUser = async () => {
        console.log('Signingup user')
        try {
            await axios.post('http://localhost:3001/auth/signup', this.state)
            this.loginUser()

        } catch (err) {
            console.log('ERROR', err)
        }

    }

    loginUser = async () => {
        // Make network request to /auth/login to login user
        console.log("this.state", this.state)
        console.log("this.state.password", this.state.password)
        console.log("this.state.email", this.state.email)
        console.log('Logging user')
        try {
            const { data } = await axios.post('http://localhost:3001/auth/login', this.state)

            const user = data.payload
            this.props.setUser(user)

        } catch (err) {
            console.log('ERROR', err)
        }
    }

    renderSignupForm = () => {
        const { email, password } = this.state
        return (
            <SignupForm
                handleChange={this.handleChange}
                email={email}
                password={password}
                signupUser={this.signupUser}
            />
        )
    }

    renderLoginForm = () => {
        const { email, password } = this.state
        return (
            <LoginForm
                handleChange={this.handleChange}
                email={email}
                password={password}
                loginUser={this.loginUser}
            />
        )
    }

    render() {
        const { isUserLoggedIn } = this.props
        return (
            <div>
                <h2>AuthContainer</h2>{
                    isUserLoggedIn ? <Redirect to="/profile" />
                        : (
                            <Switch>
                                <Route path="/login" render={this.renderLoginForm} />
                                <Route path="/signup" render={this.renderSignupForm} />
                            </Switch>
                        )
                }

            </div>
        )
    }
}

export default AuthContainer;
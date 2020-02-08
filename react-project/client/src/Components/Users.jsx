import React, { Component } from "react";
import axios from 'axios';

class Users extends Component {
    constructor() {
        super()

        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        try {
            let { data } = await axios.get('/users')
            this.setState({
                users: data.payload
            })
        } catch (err) {
            console.log('ERROR', err)
        }
    }

    render() {
        return (
            <div>
                <p>You are signed In</p>
            </div>
        )
    }
}

export default Users;

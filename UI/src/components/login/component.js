import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css'
import axios from 'axios'
import { services } from '../common/constant'

export default class Login extends React.Component {
    static propTypes = {
        loginReq: PropTypes.func.isRequired,
        getUser: PropTypes.object,
        fetchProgress: PropTypes.bool,
        setRole: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    login = (e) => {
        this.props.loginReq(this.state)
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    componentDidUpdate() {
        let roles = ''
        if (this.props.getUser && sessionStorage.getItem('user')) {
            axios.get(services.baseUrl + services.roles + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                response.data.data.forEach(element => {
                    if (element._id === JSON.parse(sessionStorage.getItem('user')).role) {
                        roles = element.name
                        this.props.setRole(roles)
                        roles === "User" ? this.props.history.push('/') : this.props.history.push('/admin')
                    }
                })
            })

        }
    }
    render() {
        const { fetchProgress } = this.props
        return (
            <div class='login'>
                <h1>User Login</h1>
                <p><label>User Name</label><input name='username' type='text' autocomplete="off" placeholder='User Name' onChange={this.myChangeHandler} /></p>
                <p><label>Password</label><input name='password' type='password' autocomplete="off" placeholder='Password' onChange={this.myChangeHandler} /></p>
                <p><button onClick={e => this.login(e)}>Login</button> <Link to="/Signup">SIGNUP</Link></p>
                {fetchProgress ? <CircularProgress color="secondary" /> : ''}
            </div>
        )
    }
}
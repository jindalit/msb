import React from 'react'
import PropTypes from 'prop-types'
import Slider from './slider'
import Newsletter from '../common/newsletter'
import WorkSection from './work-section'
import Overview from './overview'
import Dialog from './dialog'
import axios from 'axios'
import { services } from '../common/constant'


export default class HomeMain extends React.Component {
    static propTypes = {
        initLoadData: PropTypes.func.isRequired,
        getInitData: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            projects: null,
            dialogState: false
        }
    }
    componentDidMount() {
        this.props.initLoadData()
        axios.get(services.baseUrl + services.projectList+'?authToken='+sessionStorage.getItem('authToken')).then(response => {
            this.setState({
                projects: response.data.data
            })
        })
    }
    closeDialog = () => {
        // console.log('asd')
        this.setState({
            dialogState: false
        })
    }
    openDialog = () => {
        this.setState({
            dialogState: true
        })
    }
    render() {
        return (
            <div>
                <WorkSection dialogOpen={this.openDialog} />
                <Overview />
                <Slider list={this.state.projects} />
                <Newsletter />
                <Dialog enable={this.state.dialogState} closeDialog={this.closeDialog} />
            </div>
        )
    }
}
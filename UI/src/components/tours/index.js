import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { services } from '../common/constant'
import Grid from '../common/grid'
import Dialog from './dialog'
export default class Tours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogState: false,
            selectedTime: '',
            dataSet: null,
            role: ''
        }
    }
    openDialog = (e, data) => {
        this.setState({
            dialogState: true,
            selectedTime: data
        })
    }
    closeDialog = () => {
        // console.log('asd')
        this.setState({
            dialogState: false,
            viewTour: null
        })
        this.handleData()
    }
    handleData = () => {
        axios.get(services.baseUrl + services.getTour + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            let data = response.data.data
            let dataset = {
                '11AM': [],
                '12PM': [],
                '1PM': [],
                '2PM': [],
                '3PM': [],
                '4PM': []
            }
            const tourTimes = ['11AM', '12PM', '1PM', '2PM', '3PM', '4PM']
            for (let i = 0; i < tourTimes.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (tourTimes[i] === data[j].time) {
                        dataset[tourTimes[i]].push(
                            data[j]
                        )
                    }
                }
            }
            this.setState({
                dataSet: dataset
            })
        })
    }
    componentDidMount() {
        if (sessionStorage.getItem('user')) {
            axios.get(services.baseUrl + services.roles + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                response.data.data.forEach(element => {
                    if (element._id === JSON.parse(sessionStorage.getItem('user')).role) {
                        this.setState({ role: element.name })
                    }
                })
            })

        } else { this.setState({ role: 'User' }) }
        this.handleData()
    }
    deleteTour = id => {
        if (this.state.role !== 'User') {
            axios.get(services.baseUrl + services.tourDelete + '?authToken=' + sessionStorage.getItem('authToken') + '&id=' + id).then(response => {
                alert(response.data.message)
                this.handleData()
            })
        }
    }
    viewTour = data => {
        if (this.state.role !== 'User') {
            this.setState({
                dialogState: true,
                viewTour: data
            })
        }
    }
    render() {
        const dataItems = []
        if (this.state.dataSet) {
            const tourTimes = ['11AM', '12PM', '1PM', '2PM', '3PM', '4PM']
            for (let i = 0; i < 6; i++) {
                let cols = []
                let columnSet = this.state.dataSet[tourTimes[i]]
                for (let j = 0; j < columnSet.length; j++) {
                    if (columnSet[j].tourData) {
                        cols.push(<td class="table-color"><a onClick={e => {this.viewTour(columnSet[j].tourData)}}>{columnSet[j].tourData.title}</a> <i class="fa fa-times" aria-hidden="true" onClick={e => { this.deleteTour(columnSet[j].tourData._id) }}></i></td>)
                    } else {
                        cols.push(<td class="table-hover"><a class="tour-popup" onClick={e => { this.openDialog(e, columnSet[j]) }}> <i class="fa fa-plus" aria-hidden="true"></i>  </a></td>)
                    }

                }
                dataItems.push(<tr>
                    <th>{tourTimes[i]}</th>
                    {cols}
                </tr>)
            }
        }
        return (<div>
            <div class="work-section job-section">
                <div class="container">
                    <div class="work-section-inner">
                        <h2>Tour </h2>
                    </div>
                </div>
            </div>
            <div class="jobs-table">
                <div class="container">
                    <div class="jobs-table-inner">
                        <p>Tours of the Hardware Lab happen every Tuesday at 3pm. </p>
                        <p>Alternatively you can schedule a tour by picking an available time here: </p>
                        <div class="table-responsive tour-table">
                            <table class="table table-striped ">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Mon </th>
                                        <th>Tue </th>
                                        <th>Wed </th>
                                        <th>Thu </th>
                                        <th>Fri </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog enable={this.state.dialogState} closeDialog={this.closeDialog} selectedTime={this.state.selectedTime} viewTour={this.state.viewTour}/>
        </div >
        )
    }
}
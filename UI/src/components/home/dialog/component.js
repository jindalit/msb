import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { services } from '../../common/constant'

export default class Dialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            enable: this.props.enable, categoryList: [],
            reqList: [],
            fileName: '',
            reqName: '',
            closeFromEdit: false,
            isEdit: false,
            formData: {
                categoryId: '',
                requestTypeId: '',
                isImmediate: '',
                quantity: '',
                jobName: '',
                contactPerson: '',
                shippingAddress: '',
                description: '',
                timeline: '',
                hardwareFilmware: '',
                status: '5ec8eb047ef9d51f3cc63813',
                userId: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))._id : ''
            }
        }
    }
    closeDialog = () => {
        this.setState({
            enable: false,
            closeFromEdit: this.state.isEdit,
            isEdit: false

        })
        this.props.closeDialog()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.enable !== this.props.enable) {
            this.setState(
                { enable: this.props.enable }
            )
            if (this.props.reqId && (prevProps.reqId !== this.props.reqId) || prevState.closeFromEdit) {
                this.setState({closeFromEdit: false})
                axios.post(services.baseUrl + services.getById + '?authToken=' + sessionStorage.getItem('authToken'), { '_id': this.props.reqId }).then(response => {
                    var data = response.data.data;
                    var formData = { ...this.state.formData }
                    for (let key in data) {
                        formData[key] = data[key]
                    }
                    /* formData['categoryId'] = data.categoryId
                    formData['requestTypeId'] = data.requestTypeId
                    formData['isImmediate'] = data.isImmediate
                    formData['quantity'] = data.quantity
                    formData['jobName'] = data.jobName
                    formData['contactPerson'] = data.contactPerson
                    formData['shippingAddress'] = data.shippingAddress
                    formData['hardwareFilmware'] = data.hardwareFilmware
                    formData['timeline'] = data.timeline
                    formData['description'] = data.description
                    formData['status'] = data.status
                    formData['_id'] = data._id */
                    let filesName = []
                    if (data.files) {
                        for (let i = 0; i < data.files.length; i++) {
                            filesName.push(data.files[i].originalname)
                        }
                        this.setState({ fileName: filesName.join() })
                    }
                    let reqName = ''
                    this.state.reqList.forEach(value => {
                        if (value._id === data.requestTypeId) {
                            reqName = value.name
                        }
                    })
                    if (reqName !== '') {
                        this.handleChangeReq('', data.requestTypeId, reqName)
                    }
                    this.setState({ formData, isEdit: true });
                })
            }
        }
    }
    componentDidMount() {
        axios.get(services.baseUrl + services.reqList + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            this.setState({
                reqList: response.data.data
            })
            this.handleChangeReq('', response.data.data[0]._id, response.data.data[0].name)
        })
    }
    handleChangeReq = (e, id, name) => {
        var formData = { ...this.state.formData }
        const valueId = e !== '' ? e.target.value : id
        formData['requestTypeId'] = valueId
        this.setState({ formData });

        if (!name) {
            let selectedIndex = e.currentTarget.selectedIndex
            this.setState({
                reqName: e.currentTarget.options[selectedIndex].getAttribute('name')
            })
        }
        else {
            this.setState({
                reqName: name
            })
        }
        axios.post(services.baseUrl + services.categoryList + '?authToken=' + sessionStorage.getItem('authToken'), { '_id': valueId }).then(response => {
            this.setState({
                categoryList: response.data.data
            })
            this.handleChangeCatagory('', response.data.data[0].categoryId)
        })
    }
    handleChangeCatagory = (e, id) => {
        var formData = { ...this.state.formData }
        const valueId = e !== '' ? e.target.value : id
        formData['categoryId'] = valueId
        this.setState({ formData });
    }
    handleisImmediate = (e) => {
        var formData = { ...this.state.formData }
        formData['isImmediate'] = e.target.value
        this.setState({ formData });
    }
    myChangeHandler = (event) => {
        var formData = { ...this.state.formData }
        formData[event.target.name] = event.target.value
        this.setState({ formData });
    }
    isValidate = () => {
        let isValidate = true
        if (this.state.formData.jobName === '') {
            alert('Please enter Job Name.')
            isValidate = false
        } else if (this.state.formData.contactPerson === '') {
            alert('Please enter Request Contact.')
            isValidate = false
        } else if (this.state.formData.shippingAddress === '') {
            alert('Please enter Shipping Address.')
            isValidate = false
        }
        return isValidate
    }
    formSubmit = (type) => {
        var bodyFormData = new FormData();
        const data = this.state.formData
        if (this.isValidate()) {
            for (let x in data) {
                bodyFormData.set(x, data[x])
            }
            bodyFormData.set('reqStatus', type)
            var fileInst = document.querySelector('#customFile');
            if (fileInst) {
                let files = fileInst.files
                for (let i = 0; i < files.length; i++) {
                    bodyFormData.append("file", files[i])
                }

            }
            let params = this.state.isEdit ? services.baseUrl + services.updateRequest + '?authToken=' + sessionStorage.getItem('authToken') + '&_id=' + this.state.formData._id : services.baseUrl + services.createRequest + '?authToken=' + sessionStorage.getItem('authToken')
            axios({
                method: this.state.isEdit ? 'put' : 'post',
                url: params,
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(response => {
                    alert(response.data.message)
                    this.closeDialog()
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        }
    }
    render() {
        const enable = this.state.enable
        const isEnable = enable ? 'show' : ''
        const styleEnable = enable ? "block" : 'none'
        const reqListItems = []
        if (this.state.reqList) {
            for (let i = 0; i < this.state.reqList.length; i++) {
                reqListItems.push(
                    <option key={'req' + i} value={this.state.reqList[i]._id} name={this.state.reqList[i].name}>{this.state.reqList[i].name}</option>
                )
            }
        }
        const categoryListItems = []
        if (this.state.categoryList) {
            for (let i = 0; i < this.state.categoryList.length; i++) {
                categoryListItems.push(
                    <option key={'cat-' + i} value={this.state.categoryList[i].categoryId}>{this.state.categoryList[i].categoryName}</option>
                )
            }
        }
        return (<div className={"modal right fade " + isEnable} id="myModal2" tabIndex="-1" role="dialog" style={{ display: styleEnable }} aria-labelledby="myModalLabel2" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel2"><i class="fa fa-file-o" aria-hidden="true"></i>{this.state.isEdit ? 'Edit' : 'Create'} a request
                </h4>
                        <button type="button" class="close dialogClose" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" onClick={this.closeDialog}> <img src="images/ico_close.png" /></span>
                        </button>

                    </div>

                    <div class="modal-body">
                        <div class="form-first">
                            <form class="form-horizontal form-1">
                                <div class="form-group">
                                    <div class="row"><label class="col-lg-4 col-md-4 col-sm-12 control-label">Request for: </label>
                                        <div class="col-lg-8 col-md-8 col-sm-12">
                                            <select class="form-control"
                                                value={this.state.formData.requestTypeId}
                                                onChange={this.handleChangeReq}
                                            >{reqListItems}
                                            </select>

                                        </div>
                                    </div>
                                </div>
                            </form>
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <div class="row">
                                        <label class="col-lg-4 col-md-4 col-sm-12 control-label">{this.state.reqName === 'Turnkey Request' ? 'Description' : 'Category'} </label>
                                        <div class="col-lg-8 col-md-8 col-sm-12">
                                            {this.state.reqName === 'Turnkey Request' ? <textarea class="form-control" rows='5' name='description' onChange={this.myChangeHandler} value={this.state.formData.description} > </textarea> : <select class="form-control"
                                                value={this.state.formData.categoryId}
                                                onChange={this.handleChangeCatagory}
                                            >{categoryListItems}
                                            </select>}
                                        </div>
                                    </div>

                                </div>


                                <div class="form-group">
                                    <div class="row">
                                        <label class="col-lg-4 col-md-4 col-sm-12 control-label">Of immediate interest to Microsoft product
                        group? </label>
                                        <div class="col-lg-8 col-md-8 col-sm-12">
                                            <select class="form-control"
                                                value={this.state.formData.isImmediate}
                                                onChange={this.handleisImmediate}>
                                                <option value={'NO'}>No</option>
                                                <option value={'YES'}>Yes</option></select>

                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <label class="col-sm-12 col-lg-4 col-md-4 control-label">Quantity </label>
                                        <div class="col-sm-12 col-lg-8 col-md-8">
                                            <input type="number" class="form-control" name='quantity' onChange={this.myChangeHandler} value={this.state.formData.quantity} />
                                        </div>
                                    </div>

                                </div>


                                <div class="form-group">
                                    <div class="row">
                                        <label class="col-sm-12 col-lg-4  col-md-4 control-label">Job Name </label>
                                        <div class="col-sm-12 col-lg-8 col-md-8">
                                            <input type="text" class="form-control" name='jobName' value={this.state.formData.jobName} onChange={this.myChangeHandler} />
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.reqName === 'Turnkey Request' ?
                                        <div><div class="form-group">
                                            <div class="row">
                                                <label class="col-sm-12 col-lg-4  col-md-4 control-label">Timeline </label>
                                                <div class="col-sm-12 col-lg-8 col-md-8">
                                                    <textarea class="form-control" name='timeline' value={this.state.formData.timeline} onChange={this.myChangeHandler} ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <label class="col-sm-12 col-lg-4  col-md-4 control-label">Hardware, Firmware, or both? </label>
                                                    <div class="col-sm-12 col-lg-8 col-md-8">
                                                        <textarea class="form-control" name='hardwareFilmware' value={this.state.formData.hardwareFilmware} onChange={this.myChangeHandler}></textarea>
                                                    </div>
                                                </div>
                                            </div> </div> : ''}
                                <div class="form-group">
                                    <div class="row">
                                        <label class="col-sm-12 col-lg-4 col-md-4 control-label">Request Contact</label>
                                        <div class="col-sm-12 col-lg-8 col-md-8">
                                            <input type="email" class="form-control" value={this.state.formData.contactPerson} name='contactPerson' onChange={this.myChangeHandler} />
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="row">
                                        <label class="col-sm-12 col-lg-4 col-md-4 control-label">Shipping Address </label>
                                        <div class="col-sm-12 col-lg-8 col-md-8">

                                            <input type="text" class="form-control" value={this.state.formData.shippingAddress} name='shippingAddress' onChange={this.myChangeHandler} />
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.reqName !== 'Turnkey Request' ?
                                        <div class="form-group">
                                            <div class="row">
                                                <label class="col-sm-12 col-lg-4 col-md-4 control-label">Design File Upload </label>
                                                <div class="col-sm-12 col-lg-8 col-md-8">

                                                    <div class="custom-file">
                                                        {this.state.reqName === 'Mechanical Engineering Request' ? <input type="file" id="customFile" name="file" value={this.state.formData.fileName} onChange={this.myChangeHandler} /> : <input type="file" id="customFile" name="file" value={this.state.formData.fileName} onChange={this.myChangeHandler} multiple />}
                                                        {this.state.fileName}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : ''}
                            </form>
                            <div class="button">
                                <button class="btn btn-primary submit-button" onClick={e => { this.formSubmit('Submit') }}>SUBMIT JOB </button>

                                <button type="submit" class="btn btn-primary save save-draft" onClick={e => { this.formSubmit('Draft') }}>SAVE AS DRAFT</button>

                            </div>

                            <p><button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.closeDialog}>Close</button> | &nbsp;
                  Questions? <a href="#">Contact us </a></p>

                        </div>

                    </div>
                </div>
            </div>
        </div>

        )
    }
}
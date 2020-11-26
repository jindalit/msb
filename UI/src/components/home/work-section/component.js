import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export default class WorkSection extends React.Component {
    click = () => {
        this.props.dialogOpen()
    }

    render() {
        return (
            <div class="work-section">
                <div class="container">
                    <div class="work-section-inner">

                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <div class="work-col">

                                    <a onClick={this.click} class="create-button btn-demo" data-toggle="modal" data-target="#myModal"> <i class="fa fa-file-o" aria-hidden="true"></i> Create a new Request </a>

                                </div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-12">
                                <div class="work-col">
                                    <Link class="request-button-1" to='/viewHistory'> <i class="fa fa-file-o" aria-hidden="true"></i> View request history</Link>
                                </div>
                            </div>


                        </div>



                    </div>
                </div>
            </div>
        )
    }
}
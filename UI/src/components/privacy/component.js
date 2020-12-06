import React from 'react'
import PropTypes from 'prop-types'
import Newsletter from '../common/newsletter'

export default class Privacy extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div class="content-section">
                    <div class="privacy-section">
                        <div class="container">
                            <div class="overview-section-inner">
                                <h1>Privacy Policy</h1>
                                <h6>List of User's Emails and Shipping Addresses
            </h6>
                                <div class="table-responsive tour-table">
                                    <table class="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th class="center">Email</th>
                                                <th class="center">Address </th>
                                                <th class="center"> </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <a href="#">Email 1</a>
                                                </td>
                                                <td>Address 1</td>
                                                <td><button class="btn btn-secondary">Delete</button></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="#">Email 2</a>
                                                </td>
                                                <td>Address 2</td>
                                                <td><button class="btn btn-secondary">Delete</button></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="#">Email 3</a>
                                                </td>
                                                <td>Address 3</td>
                                                <td><button class="btn btn-secondary">Delete</button></td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <a target='_blank' href='http://go.microsoft.com/fwlink/?LinkId=518021'>Notice & Consent Statement</a><br />
                                    <a target='_blank' href='https://go.microsoft.com/fwlink/?LinkId=521839'>Data Privacy Notice</a><br />
                                    <input type='checkbox' /> I agree to the privacy and data retention policies
              <button class="btn btn-primary rightAlign">Opt out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Newsletter />
            </React.Fragment >
        )
    }
}
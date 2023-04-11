import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleDot } from '@fortawesome/free-solid-svg-icons';
const moment = require('moment') 

function ComplaintItem(props) {
    const {complaintSubject, complaintDescription, createdAt, complaintBy, complaintStatus} = props.complaint;
    const statusColor = complaintStatus==="Resolved"?"green":"red";
    return (
        <>
            <Col md="6">
                        <Card className="card-stats">
                            <CardHeader>
                                <CardTitle tag="h4" className="d-flex flex-row">{complaintSubject}
                                    <div className="ml-auto">
                                        <p style={{ fontSize: "15px" }} className="card-category">by: <FontAwesomeIcon icon={faUser} style={{ marginLeft: "4px", marginRight: "4px" }} />{complaintBy}</p>

                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <p className="card-category">{complaintDescription} </p>
                            </CardBody>
                            <CardFooter>
                                <hr />
                                <div className="stats d-flex flex-row">
                                    <div>
                                        <strong>Status-</strong><FontAwesomeIcon icon={faCircleDot} style={{ marginLeft: "10px", marginRight: "3px", color: `${statusColor}`, }} /> {complaintStatus}
                                    </div>
                                    <div className="ml-auto">
                                        {moment(createdAt).format('DD-MM-YYYY')}
                                    </div>

                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
        </>
    )
}

export default ComplaintItem

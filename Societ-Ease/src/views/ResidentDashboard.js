import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
} from "reactstrap";
import { Link } from 'react-router-dom';
import { getMyBills } from "api/Bills/billApi";
import { getMyComplaints } from "api/Complaint/complaintApi";
import { getNotice } from "api/Notice/noticeApi";
import { getMaintenance } from "api/Maintenance/maintenanceApi";

function ResidentDashboard() {
    const residentData = JSON.parse(localStorage.getItem('userDetails'))
    const userType = localStorage.getItem('userType')
    const [complaintCount, setComplaintCount] = useState(0);
    const [noticeCount, setNoticeCount] = useState(0);
    const [maintenanceCount, setMaintenanceCount] = useState(0);
    const [catBill, setCatBill] = useState([
        {
            billRoomNumber: "",
            electricity_Dues: 0,
            water_Dues: 0,
            maintenance_Dues: 0,
            wifi_Dues: 0,
            total_Dues: 0
        }
    ])

    const groupBillsByRoomNumber = (bills) => {
        const mp = new Map();
        bills.map((bill) => {
            if (bill.billType === 'Water') {
                if (mp.has(bill.billRoomNumber)) {
                    let obj = mp.get(bill.billRoomNumber);
                    mp.set(bill.billRoomNumber, { ...obj, water_Dues: bill.billDue, total_Dues: obj.total_Dues + bill.billDue })
                } else {
                    mp.set(bill.billRoomNumber, { billRoomNumber: bill.billRoomNumber, water_Dues: bill.billDue, total_Dues: bill.billDue });
                }
            } else if (bill.billType === 'Maintenance') {
                if (mp.has(bill.billRoomNumber)) {
                    let obj = mp.get(bill.billRoomNumber);
                    mp.set(bill.billRoomNumber, { ...obj, maintenance_Dues: bill.billDue, total_Dues: obj.total_Dues + bill.billDue })
                } else {
                    mp.set(bill.billRoomNumber, { billRoomNumber: bill.billRoomNumber, maintenance_Dues: bill.billDue, total_Dues: bill.billDue });
                }
            } else if (bill.billType === 'Electricity') {
                if (mp.has(bill.billRoomNumber)) {
                    let obj = mp.get(bill.billRoomNumber);
                    mp.set(bill.billRoomNumber, { ...obj, electricity_Dues: bill.billDue, total_Dues: obj.total_Dues + bill.billDue })
                } else {
                    mp.set(bill.billRoomNumber, { billRoomNumber: bill.billRoomNumber, electricity_Dues: bill.billDue, total_Dues: bill.billDue });
                }
            } else if (bill.billType === 'Wifi') {
                if (mp.has(bill.billRoomNumber)) {
                    let obj = mp.get(bill.billRoomNumber);
                    mp.set(bill.billRoomNumber, { ...obj, wifi_Dues: bill.billDue, total_Dues: obj.total_Dues + bill.billDue })
                } else {
                    mp.set(bill.billRoomNumber, { billRoomNumber: bill.billRoomNumber, wifi_Dues: bill.billDue, total_Dues: bill.billDue });
                }
            }
        })

        let fl = []
        for (const [key, value] of mp) {
            fl.push(value)
        }
        console.log(fl)

        setCatBill(fl)
    }

    const countUnresolvedComplaints = (response) => {
        const complaints = response.myComplaints;
        let count = 0;
        complaints.map((comp) => {
            if (comp.complaintStatus !== "Resolved") {
                count++;
            }
        })

        setComplaintCount(count);
    }

    const fetchAllComplaints = async () => {
        const response = await getMyComplaints();
        if (response.success) {
            console.log(response);
            countUnresolvedComplaints(response)
        } else {
            console.log(response);
        }
    }

    const fetchAllBills = async () => {
        const response = await getMyBills();
        if (response.success) {
            console.log(response)
            groupBillsByRoomNumber(response.bills)
            console.log(catBill[0])
        } else console.log(response)
    }

    const fetchAllNotices = async () => {
        const response = await getNotice();
        if (response.success) {
            console.log(response);
            setNoticeCount(response.notices.length);
        } else {
            console.log(response);
        }
    }

    const fetchAllMaintenance = async () => {
        const response = await getMaintenance();
        if (response.success) {
            console.log(response);
            setMaintenanceCount(response.maintenance.length)
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        fetchAllBills();
        fetchAllComplaints();
        fetchAllNotices();
        fetchAllMaintenance();
    }, [])

    return (
        <>
            {userType === 'resident' && residentData ?
                <div className="content">
                    <Row>
                        <Col md="4">
                            <Card className="card-user" style={{ height: "60vh" }}>
                                <div className="image">
                                    <img
                                        src={require("assets/img/solid-color-image.png")}
                                        alt="..."
                                    />
                                </div>
                                <CardBody>
                                    <div className="author">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="avatar border-gray"
                                                src={require("assets/img/logo-profile.png")}
                                                style={{ width: "150px", height: "auto" }}
                                            />
                                            <h3 className="title">{residentData.residentName}</h3>
                                        </a>
                                        <p className="description"><strong>Security key-</strong>{residentData.securityKey}</p>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="button-container">
                                        <Row>
                                            <Col className="ml-auto" lg="3" md="6" xs="6">
                                                <h5>
                                                    {residentData.residentRoomNumber}<br />
                                                    <small>Room no.</small>
                                                </h5>
                                            </Col>
                                            <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                                <h5>
                                                    {complaintCount}<br />
                                                    <small>Active complaints</small>
                                                </h5>
                                            </Col>
                                            <Col className="mr-auto" lg="3">
                                                <h5>
                                                    {catBill[0].total_Dues} Rs <br />
                                                    <small>Pending bill</small>
                                                </h5>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="8" className="d-flex align-items-center">
                            <Row>
                                <Col md="6">
                                    <Card className="card-stats" style={{ margin: "20px auto", width: "85%", height: "   27vh", }} >
                                        <CardBody>
                                            <Row>
                                                <Col md="2" xs="5">
                                                    <div className="icon-big text-center icon-warning text-warning">
                                                        <i className="nc-icon nc-paper" />
                                                    </div>
                                                </Col>
                                                <Col md="10" xs="7">
                                                    <div className="numbers">
                                                        <p className="card-category">{noticeCount} Active Notices</p>
                                                        <Link to="/resident/Notices" className="linktag" ><CardTitle tag="p">View Notices </CardTitle></Link>
                                                        <p />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                        <CardFooter>
                                            <hr />
                                            <div className="stats">
                                                <Link to="/resident/Notices" className="linktag" ><i className="fas fa-sync-alt" /> See all current notices </Link>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col md="6">
                                    <Card className="card-stats" style={{ margin: "20px auto", width: "85%", height: "   27vh", }} >
                                        <CardBody>
                                            <Row>
                                                <Col md="2" xs="5">
                                                    <div className="icon-big text-center icon-warning text-warning">
                                                        <i className="nc-icon nc-settings" style={{ color: "red" }} />
                                                    </div>
                                                </Col>
                                                <Col md="10" xs="7">
                                                    <div className="numbers">
                                                        <p className="card-category">{maintenanceCount} Undergoing Maintenance</p>
                                                        <Link to="/resident/Maintenance" className="linktag" ><CardTitle tag="p">Maintenance   </CardTitle></Link>
                                                        <p />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                        <CardFooter>
                                            <hr />
                                            <div className="stats">
                                                <Link to="/resident/Maintenance" className="linktag" ><i className="fas fa-sync-alt" /> View all maintenance undergoing </Link>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col md="6">
                                    <Card className="card-stats" style={{ margin: "20px auto", width: "85%", height: "   27vh", }} >
                                        <CardBody>
                                            <Row>
                                                <Col md="2" xs="5">
                                                    <div className="icon-big text-center icon-warning text-warning">
                                                        <i className="nc-icon nc-credit-card" style={{ color: "green" }} />
                                                    </div>
                                                </Col>
                                                <Col md="10" xs="7">
                                                    <div className="numbers">
                                                        <p className="card-category">Rs. {catBill[0].total_Dues} Due</p>
                                                        <Link to="/resident/Bills" className="linktag" ><CardTitle tag="p">Bills </CardTitle></Link>
                                                        <p />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                        <CardFooter>
                                            <hr />
                                            <div className="stats">
                                                <Link to="/resident/Bills" className="linktag" ><i className="fas fa-sync-alt" /> Click to see detailed bill </Link>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col md="6">
                                    <Card className="card-stats" style={{ margin: "20px auto", width: "85%", height: "   27vh" }} >
                                        <CardBody>
                                            <Row>
                                                <Col md="2" xs="5">
                                                    <div className="icon-big text-center icon-warning text-warning">
                                                        <i className="nc-icon nc-chat-33 " style={{ color: "cyan" }} />
                                                    </div>
                                                </Col>
                                                <Col md="10" xs="7">
                                                    <div className="numbers">
                                                        <p className="card-category">{complaintCount} Unresolved Complaints</p>
                                                        <Link to="/resident/Complaints" className="linktag" ><CardTitle tag="p">Post complaint   </CardTitle></Link>
                                                        <p />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                        <CardFooter>
                                            <hr />
                                            <div className="stats">
                                                <Link to="/resident/Complaints" className="linktag" ><i className="fas fa-sync-alt" /> Having any issues? Complaint now </Link>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </div>
                : <div className="content"> Not Authorised </div>}
        </>
    );
}

export default ResidentDashboard;

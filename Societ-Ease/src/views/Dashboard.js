import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Complaints from "../components/Complaints";
import { Link } from 'react-router-dom';
import "../assets/css/paper-dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


function Dashboard() {
  
  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  const userType = localStorage.getItem('userType')

  return (
    <>
    {userType==='admin' && userDetails?
      <div className="content">
        <Row>
          <Col lg="4" md="4" sm="12">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="2" xs="5">
                    <div className="icon-big text-center icon-warning text-warning">
                      <i className="nc-icon nc-paper" />
                    </div>
                  </Col>
                  <Col md="10" xs="7">
                    <div className="numbers">
                      <p className="card-category">3 active notices</p>
                      <Link to="/admin/Notices" className="linktag" ><CardTitle tag="p">Create Notice <FontAwesomeIcon icon={faCirclePlus} style={{ marginLeft: "10px", color: "#7a7a7a", }} /></CardTitle></Link>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <Link to="/admin/Notices" className="linktag" ><i className="fas fa-sync-alt" /> Click to view all </Link>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="12">
            <Card className="card-stats">
              <CardBody>
                <Row>
                <Col md="2" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-credit-card text-primary" />
                    </div>
                  </Col>
                  <Col md="10" xs="7">
                    <div className="numbers">
                      <p className="card-category">8 Pending Bills</p>
                      <Link to="/admin/Bills" className="linktag" ><CardTitle tag="p">Create Bills <FontAwesomeIcon icon={faCirclePlus} style={{ marginLeft: "10px", color: "#7a7a7a", }} /></CardTitle></Link>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <Link to="/admin/Bills" className="linktag" > <i className="fas fa-sync-alt" /> Click to view all </Link>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="12">
            <Card className="card-stats">
              <CardBody>
                <Row>
                <Col md="2" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-settings text-danger" />
                    </div>
                  </Col>
                  <Col md="10" xs="7">
                    <div className="numbers">
                      <p className="card-category">4 ongoing</p>
                      <Link to="/admin/Maintenance" className="linktag" ><CardTitle tag="p">Add Maintenance <FontAwesomeIcon icon={faCirclePlus} style={{color: "#7a7a7a", }} /></CardTitle></Link>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <Link to="/admin/Maintenance" className="linktag" ><i className="fas fa-sync-alt" /> Click to view all </Link>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Complaints />
      </div>:
      <div className="content">Not Authorised</div>
      }

    </>
  );
}

export default Dashboard;

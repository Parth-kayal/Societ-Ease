import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { Link } from 'react-router-dom';
const moment = require('moment') 

function GuestDashboard() {
  const guest = JSON.parse(localStorage.getItem('userDetails'))
  const userType = localStorage.getItem('userType')
  return (
    <>
    {userType==='guest' && guest? 
      <div className="content">
        <Row >
          <Col md="11" style={{ margin: "auto" }}>
            <Card className="card card-user" >
              <div className="image" style={{ height: "250px", width: "100%" }}>
                <img style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                  src={require("assets/img/guestPass.png")}
                  alt="guestPass image"
                />
              </div>
              <CardBody>
                <div className="author" style={{ width: "auto", height: "auto", position: "absolute", top: "40%", right: "5%" }}>
                  <a href="#pablo" style={{textDecoration:"none"}} onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/logo-profile.png")}
                      style={{ width: "55%", height: "auto", borderRadius: "2px", border: "6px solid #4e4e4e", }}
                    />
                    <h3 className="title">{guest.guestName}</h3>
                  </a>
                </div>
                <Row style={{ margin: "20px 10px", fontSize: "1rem" }}>
                  <Col className="text-right" lg="2" >
                    <h6 className="card-title" style={{ margin: "0px" }}>Contact:</h6><br />
                    <h6 className="card-title" style={{ margin: "0px" }}>Email:</h6><br />
                    <h6 className="card-title" style={{ margin: "0px" }}>Room no:</h6><br />
                    <h6 className="card-title" style={{ margin: "0px" }}>Purpose:</h6><br />
                    <h6 className="card-title" style={{ margin: "0px" }}>In Date:</h6><br />
                  </Col>
                  <Col lg="6" className="text-left">
                    <p className="description" style={{ margin: "0px", lineHeight: "1.2rem" }}><strong>{guest.guestContactNumber}</strong></p><br />
                    <p className="description" style={{ margin: "0px", lineHeight: "1.2rem" }}><strong>{guest.guestEmail}</strong></p><br />
                    <p className="description" style={{ margin: "0px", lineHeight: "1.2rem" }}><strong>{guest.guestRoomNumber}</strong></p><br />
                    <p className="description" style={{ margin: "0px", lineHeight: "1.2rem" }}><strong>{guest.visitPurpose}</strong></p><br />
                    <p className="description" style={{ margin: "0px", lineHeight: "1.2rem" }}><strong>{moment(guest.guestVisitDate).format('DD-MM-YYYY')}</strong></p><br />
                  </Col>
                </Row>

              </CardBody>
              <CardFooter className="card-footer">
                <hr />
                <div style={{marginLeft:"10px",color:"#9A9A9A"}}>
                <strong>T&C* &nbsp;</strong> The guest pass is non-transferable and must be used only by the person named on the pass.
                </div>
              </CardFooter>
            </Card>
          </Col>


        </Row>
      </div>
      : <> <div className="content"> Not Authorised</div></>}
    </>
  );
}

export default GuestDashboard;

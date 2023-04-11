import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateResident } from "api/Admin/adminApi";

function User(props) {

  const { setResi, resi, fetchAll } = props;
  const [resident, setResident] = useState(resi);
  const [rs, setRs] = useState(resi)
  const handleChange = (e) => {
    setRs({ ...rs, [e.target.name]: e.target.value })
  }

  const showSuccessMessage = (msg) => {
    toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
  };

  const showErrorMessage = (msg)=>{
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateResident(rs);
    if (response.success) {
      console.log(response);
      showSuccessMessage("Resident Profile Updated")
      setRs(response.resident)
      setResident(rs)
    } else {
      showErrorMessage("An Error Occurred")
      console.log(response)
    }
  }


  return (
    <>
      
      <div className="content">
      <ToastContainer></ToastContainer>
        <h6 style={{ cursor: "pointer" }} onClick={() => { setResi(null); fetchAll(); }}> &larr; Back</h6>
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  src={require("assets/img/solid-color-image.png")}
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/logo-profile.png")}
                    />
                    <h5 className="title">{resident.residentName}</h5>
                  </a>
                  <p className="description"><strong>Security key-</strong>{resident.securityKey}</p>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        {resident.residentRoomNumber}<br />
                        <small>Room no.</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        2 <br />
                        <small>Complaints</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                        2000<br />
                        <small>Pending bills</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>

          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="12">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          name="residentName"
                          onChange={handleChange}
                          defaultValue={resident.residentName}
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Contact No.</label>
                        <Input
                          name="residentContactNumber"
                          onChange={handleChange}
                          defaultValue={resident.residentContactNumber}
                          placeholder=""
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <Input placeholder="" name="residentEmail" onChange={handleChange} value={resident.residentEmail} type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <FormGroup>
                        <label>Aadhar Number</label>
                        <Input
                          disabled
                          defaultValue={resident.residentAadhar}
                          placeholder=""
                          type="text"
                          name="residentAadhar"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Room number</label>
                        <Input
                          onChange={handleChange}
                          name="residentRoomNumber"
                          defaultValue={resident.residentRoomNumber}
                          placeholder=""
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Complaints</label>
                        <Input
                          defaultValue="2"
                          placeholder="Country"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Pending bills</label>
                        <Input placeholder="" defaultValue="2000" type="number" disabled />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;

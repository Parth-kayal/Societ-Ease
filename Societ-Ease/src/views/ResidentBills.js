import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardHeader,
  Table,
  Row,
  Col
} from "reactstrap";
import { getMyBills, payBill, getMyPayments} from "api/Bills/billApi";
import { Link } from 'react-router-dom';

function Bills() {
  const closeref = useRef();
  const addRef = useRef();

  const residentID = JSON.parse(localStorage.getItem('userDetails')).residentID;
  const [paymentData, setPaymentData] = useState({
    paymentAmount: 0,
    billType: "",
    paymentID: "",
    residentID: residentID
  })

  const [paymentList, setPaymentList] = useState({
    "success": true,
    "payments": [
      {
        "_id": "64305f6e419120d7cd4af6d0",
        "paymentID": "adsadhjjj",
        "paymentAmount": 1000,
        "paidBy": "903c6429-9884-48ce-83e7-887630677c14",
        "paymentStatus": "Successful",
        "__v": 0
      },
    ]
  })

  const [billList, setBillList] = useState({
    "success": true,
    "bills": [
      {
        "_id": "6430567633c6406d6e317eb6",
        "billID": "dd2f1604-182e-42e2-9611-7a073b157f56",
        "billRoomNumber": 101,
        "billForResident": "903c6429-9884-48ce-83e7-887630677c14",
        "billType": "Water",
        "billDue": 2000,
        "billStatus": "Paid",
        "__v": 0,
        "billTotal": 3000
      }
    ]
  })

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

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value })
  }

  const handleClick = ()=>{
    addRef.current.click();
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(paymentData)
    const response = await payBill(paymentData);
    if(response.success){
      console.log(response);
      closeref.current.click();
      fetchAllPayments();
      fetchAllBills();
    }else{
      console.log(response)
    }
  }
  

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

  const fetchAllBills = async () => {
    const response = await getMyBills();
    if (response.success) {
      console.log(response)
      groupBillsByRoomNumber(response.bills)
    } else console.log(response)
  }

  const fetchAllPayments = async ()=>{
    const response = await getMyPayments(residentID)
    console.log(response)
    if(response.success){
      console.log(response);
      setPaymentList(response)
    }else{
      console.log(response)
    }
  }

  useEffect(() => {
    fetchAllBills();
    fetchAllPayments();
  }, [])

  
  return (
    <>
      <div className="content w-  h- ">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
              <div className="d-flex flex-row">
              <CardTitle tag="h4">Your Bill </CardTitle>
              <button className="btn btn btn-outline-success ml-auto" onClick = {handleClick}> Pay Bill</button>
              </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Room No.</th>
                      <th>Electricity Dues</th>
                      <th>Water Dues</th>
                      <th>Maintenance Dues</th>
                      <th>Wifi Dues</th>
                      <th>Total Dues</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catBill.map((bill) => {
                      return <tr key={bill.billID}>
                        <td>{bill.billRoomNumber}</td>
                        <td>{bill.electricity_Dues ? bill.electricity_Dues : 0}</td>
                        <td>{bill.water_Dues ? bill.water_Dues : 0}</td>
                        <td >{bill.maintenance_Dues ? bill.maintenance_Dues : 0}</td>
                        <td >{bill.wifi_Dues ? bill.wifi_Dues : 0}</td>
                        <td >{bill.total_Dues ? bill.total_Dues : 0}</td>
                      </tr>
                    })}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="3" >
            <Card className="card-stats" style={{height: "auto", }} >
              <CardBody>
                <Row className="d-flex align-items-center justify-content-center align-text-center">
                  <Col md="12">
                    <div className="text-center">
                      <img style={{height:"270px"}} src={require('../assets/img/qr-code.png')} />
                    </div>
                  </Col>
                  <Col md="12" xs="7" className="d-flex justify-content-center">
                    <div className="text-center">
                      <CardTitle tag="h4"> Pay using UPI </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  Upi id- 8696054228@ybl
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="3">
            <Card className="card-stats" style={{height: "auto", }} >
              <CardBody>
                <Row className="d-flex align-items-center justify-content-center align-text-center">
                  <Col md="12">
                    <div className="text-center">
                      <img style={{height:"250px"}} src={require('../assets/img/bank.webp')} />
                    </div>
                  </Col>
                  <Col md="12" xs="7" className="d-flex justify-content-center align-items-center align-text-center">
                    <div className="text-center">
                      <CardTitle className="card-title" tag="h4"> Pay to Bank account </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                <strong>Prateek Arora</strong>
                <br />
                  Account No- 028501007055
                  <br />
                  IFSC- ICIC0000285
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Transaction history </CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Transaction Amount</th>
                      <th>Transaction ID</th>
                      <th>Bill type</th>
                      <th>Transaction status</th>
                    </tr>
                  </thead>
                  <tbody style={{}}>
                    {paymentList.payments.map((payment) => {
                      return <tr key={payment.paymentID}>
                        <td>{payment.paymentAmount}</td>
                        <td>{payment.paymentID}</td>
                        <td>{payment.billType}</td>
                        <td >{payment.paymentStatus}</td>
                      </tr>
                    })}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Adding Notice */}
      <button className="btn d-none" ref={addRef} data-target="#addModal" data-toggle="modal">Add</button>

      {/* Add notice modal */}
      <div>
        <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModal" aria-hidden="true">
          <div className="modal-dialog custom-modal-box">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Payment Info</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="row modal-body">
                <div className="log popup-form">
                  <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="form-box popup-form-box" style={{ height: "auto", width: "100%" }}>
                      <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Payment Amount*</label>
                          <input type="text" name="paymentAmount" onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>
                        <div className="col-12 mb-4">
                          <label htmlFor="description" className="form-label mb-2">Transaction ID*</label>
                          <input type="text" className="form-control" name="paymentID" onChange={handleChange} placeholder="" id="floatingTextarea2" ></input>
                        </div>
                        <div className="col-12 mb-4">
                          <label htmlFor="description" className="form-label mb-2">Bill Type*</label>
                          <select name="billType" onChange={handleChange} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option value="Electricity">Electricity</option>
                            <option value="Water">Water</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Wifi">Wifi</option>
                          </select>
                          {/* <input type="text" className="form-control" name="billType" onChange={handleChange} placeholder="" id="floatingTextarea2"></input> */}
                        </div>
                        <div className="col-12">
                          <button ref={closeref} type="button" className="btn" data-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-success"> Add Payment</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bills;

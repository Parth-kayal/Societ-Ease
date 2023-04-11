import React, {useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import {getAllResident} from '../api/Admin/adminApi';
import User from "components/User";

function UserData() {
  const [residentList, setResidentList] = useState({
    "success": true,
    "residentsData": [
      {
        "_id": "64299699acb38abbbcce8cb8",
        "residentID": "903c6429-9884-48ce-83e7-887630677c14",
        "residentName": "prashant",
        "residentContactNumber": "8888888888",
        "residentEmail": "prash@gmail.com",
        "residentAadhar": "444455556666",
        "residentRoomNumber": 101,
        "familyMembers": [],
        "securityKey": "abcd",
        "status": "active",
        "__v": 0
      }
    ]
  });

  const fetchAllResident = async ()=>{
    const response = await getAllResident();
    if(response.success){
      console.log(response);
      setResidentList(response);
    }else{
      console.log(response);
    }
  }
  
  const [resi, setResi] = useState(null)

  useEffect(() => {
    fetchAllResident();
  }, [])

  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  const userType = localStorage.getItem('userType')

  return (
    <>
    {userType==='admin' && userDetails?
    <>
    {resi?<User setResi={setResi} resi={resi} key={resi.residentID} fetchAll = {fetchAllResident}/>:
      <div className="content w-auto h-auto">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">All Residents </CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Room no.</th>
                      <th>Contact No.</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residentList.residentsData.map((resident)=>{
                      return <>
                        <tr key={resident.residentID} onClick = {()=>{setResi(resident)}} style={{cursor:"pointer"}}>
                          <td>{resident.residentName}</td>
                          <td>{resident.residentRoomNumber}</td>
                          <td>{resident.residentContactNumber}</td>
                          <td >{resident.residentEmail}</td>
                        </tr>
                      </>
                    })}
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
           </Row>
      </div>
    }
    </>
    : <> <div className="content"> Not Authorised</div></>}
    </>
  );
}

export default UserData;

import React, {useEffect, useState} from "react";
import {Row} from "reactstrap";
import { getAllComplaints } from "api/Complaint/complaintApi";
import ComplaintItem from "./Items/ComplaintItem";

export default function Complaints() {
    const [complaintList, setComplaintList] = useState({
        "success": true,
        "complaints": [
          {
            "_id": "642d90f726a72e078889571b",
            "complaintID": "20c92c56-79c9-4649-8988-9cecd6b9d91a",
            "complaintSubject": "Demo",
            "complaintDescription": "kjjhkkjggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
            "complaintBy": "undefined Room No: undefined",
            "complaintStatus": "Resolved",
            "complaintPriority": "High",
            "createdAt": "2023-04-05T15:17:11.889Z",
            "updatedAt": "2023-04-05T17:54:50.089Z",
            "__v": 0
          },
        ]
      })

    const fetchAllComplaints = async ()=>{
        const response = await getAllComplaints();
        console.log(localStorage.getItem('token'))
        if(response.success){
            setComplaintList(response);
            console.log(response)
            console.log(complaintList)

        }else {
            console.log(response)
        }
    }

    useEffect(() => {
        fetchAllComplaints();
        
    }, [])

    return (
        <>
            <div className="content"><h2 className="title" style={{marginBottom:"55px",marginTop:"60px"}}>Resident's complaints</h2>
                <Row>
                    {complaintList.complaints.map((complaint)=>{return <>
                        <ComplaintItem complaint = {complaint} key={complaint._id}> </ComplaintItem>
                    </>
                    })}
                </Row>
            </div>
        </>
    );
}



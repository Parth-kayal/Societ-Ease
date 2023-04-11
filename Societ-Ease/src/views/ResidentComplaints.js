
import React, { useRef, useEffect, useState } from "react";
import {
  Row,
  Col
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import ResidentComplaintItem from "components/Items/ResidentComplaintItem";
import { getMyComplaints} from "api/Complaint/complaintApi";
import { addComplaint, updateComplaint, deleteComplaint, resolveComplaint } from "api/Complaint/complaintApi";

function ResidentComplaint() {
  const closeref = useRef();
  const addRef = useRef();
  const editRef = useRef();
  const delRef = useRef();
  const resRef = useRef();
  const closeDelRef = useRef();
  const closeResRef = useRef();
  const [delId, setDelId] = useState("")
  const [resId, setResId] = useState("")
  const [complaintData, setComplaintData] = useState({
        _id: "",
        complaintID: "",
        complaintSubject: "",
        complaintDescription: "",
        complaintPriority: "",
        complaintStatus:"",
        __v: 0
  })

  const [complaintList, setComplaintList] = useState({
    "success": true,
    "myComplaints": [
      {
        "_id": "64328d93b5cf1efc4368a3bb",
        "complaintID": "a599f6c6-2759-47b3-98b0-c36219379c46",
        "residentID": "903c6429-9884-48ce-83e7-887630677c14",
        "complaintSubject": "dfdsf",
        "complaintDescription": "uuuuuuuuuuuuuuiiiiiiiiiiggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
        "complaintBy": "Prashant Kumar singh Room No: 101",
        "complaintStatus": "Not resolved",
        "complaintPriority": "High",
        "createdAt": "2023-04-09T10:04:03.210Z",
        "updatedAt": "2023-04-09T10:04:03.210Z",
        "__v": 0
      }
    ]
  })

  const updateItem = (complaint) => {
    editRef.current.click();
    setComplaintData(complaint)
  }

  const deleteItem = (complaint) => {
    delRef.current.click();
    setDelId(complaint.complaintID);
  }

  const resolveItem = (complaint)=>{
    resRef.current.click();
    setResId(complaint.complaintID);
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

  const handleChange = (e) => {
    setComplaintData({ ...complaintData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await updateComplaint(complaintData);
    if (response.success) {
      console.log(response);
      closeref.current.click();
      showSuccessMessage("Complaint Updated Successfully")
      fetchAllComplaints();
    } else {
      showErrorMessage("An Error occurred")
      console.log(response);
    }

  }

  const handleClick = () => {
    closeDelRef.current.click();
    if (delId) handleDelete();
  }

  const handleDelete = async (e) => {
    // e.preventDefault();
    console.log(delId)
    const response = await deleteComplaint(delId);
    if (response.success) {
      console.log(response)
      showSuccessMessage("Complaint Deleted")
      fetchAllComplaints();
    }else{
      showErrorMessage("An Error Occuurred")
    }
  }

  const handleResClick = ()=>{
    closeResRef.current.click();
    handleResolve();
  }

  const handleResolve = async ()=>{
    const response = await resolveComplaint(resId);

    if(response.success){
      console.log(response);
      fetchAllComplaints();
    }else{
      console.log(response);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const response = await addComplaint(complaintData);
    if (response.success) {
      console.log(response)
      closeref.current.click();
      showSuccessMessage("Complaint Posted")
      fetchAllComplaints()
    } else {
      showErrorMessage("An Error Occurred")
      console.log(response);
    }
  }

  const fetchAllComplaints = async () => {
    const response = await getMyComplaints();
    if (response.success) {
      console.log(response);
      setComplaintList(response);
    } else {
      console.log(response);
    }
  }

  useEffect(() => {
    fetchAllComplaints();
  }, [])

  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  const userType = localStorage.getItem('userType')

  return (
    
    <>
    {userType==='resident' && userDetails?
    <>
    <ToastContainer></ToastContainer>
      <div className="content w-auto h-auto">
        <Row>
          <Col lg="3" md="3" sm="12" className="mx-4 d-flex align-items-center justify-content-center"><FontAwesomeIcon icon={faCirclePlus} onClick={() => { addRef.current.click() }} style={{ height: "200px", color: "#7a7a7a", cursor:"pointer" }} /></Col>
          {complaintList.myComplaints.map((complaint)=>{
            return <>
              <ResidentComplaintItem updateItem={updateItem} deleteItem={deleteItem} resolveItem = {resolveItem} complaint={complaint}></ResidentComplaintItem>
            </>
          })}
        </Row>
      </div>

      {/* Modal activation buttons */}
      <button className="btn d-none" ref={addRef} data-target="#addModal" data-toggle="modal">edit</button>
      {/* Update Notice */}
      <button className="btn d-none" ref={editRef} data-target="#editModal" data-toggle="modal">Edit</button>
      {/* Delete Notice */}
      <button className="btn d-none" ref={delRef} data-target="#deleteModal" data-toggle="modal">delete</button>
      {/* Delete Notice */}
      <button className="btn d-none" ref={resRef} data-target="#resolveModal" data-toggle="modal">resolve</button>

      {/* Create modal */}
      <div>
        <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModal" aria-hidden="true">
          <div className="modal-dialog custom-modal-box">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Post Complaint</h5>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="row modal-body">
                <div className="log popup-form">
                  <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="form-box popup-form-box" style={{ height: "auto", width: "100%" }}>
                      <form className="row g-3" onSubmit={handleCreate}>
                        <div className="col-12 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Subject*</label>
                          <input type="text" name="complaintSubject" onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>
                        <div className="col-12 mb-4">
                          <label htmlFor="description" className="form-label mb-2">Description*</label>
                          <textarea className="form-control" name="complaintDescription" onChange={handleChange} placeholder="Description" id="floatingTextarea2" style={{ height: '200px' }}></textarea>
                        </div>
                        <div className="col-6 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Priority*</label>
                          <select name="complaintPriority" onChange={handleChange} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option value="High">High</option>
                            <option value="Low">Low</option>
                          </select>
                          {/* <input type="text" name="complaintPriority" onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" /> */}
                        </div>

                        <div className="col-12">
                          <button ref={closeref} type="button" className="btn" data-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-success"> Post Complaint</button>
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

      {/* Update Modal */}
      <div>
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
          <div className="modal-dialog custom-modal-box">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update Complaint</h5>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="row modal-body">
                <div className="log popup-form">
                  <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="form-box popup-form-box" style={{ height: "auto", width: "100%" }}>
                      <form className="row g-3" onSubmit={handleUpdate}>
                        <div className="col-12 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Subject*</label>
                          <input type="text" name="complaintSubject" value={complaintData.complaintSubject} onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>
                        <div className="col-12 mb-4">
                          <label htmlFor="description" className="form-label mb-2">Description*</label>
                          <textarea className="form-control" name="complaintDescription" value={complaintData.complaintDescription} onChange={handleChange} placeholder="Description" id="floatingTextarea2" style={{ height: '200px' }}></textarea>
                        </div>
                        <div className="col-6 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Status*</label>
                          <input type="text" name="complaintStatus" value={complaintData.complaintStatus} onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>
                        <div className="col-6 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Priority*</label>
                          <input type="text" name="complaintPriority" value={complaintData.complaintPriority} onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>

                        <div className="col-12">
                          <button ref={closeref} type="button" className="btn" data-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-success"> Update</button>
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
      
      {/* Delete modal */}
      <div>
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModal" aria-hidden="true">
          <div className="modal-dialog custom-modal-box">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete Complaint</h5>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Do you want to delete this complaint?</p>
                <button type="submit" className="btn btn-outline-danger" onClick={handleClick}>Yes</button>
                <button type="button" ref={closeDelRef} className="btn btn-outline-success mx-3" data-dismiss="modal">No</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resolve modal */}
      <div>
        <div className="modal fade" id="resolveModal" tabIndex="-1" aria-labelledby="resolveModal" aria-hidden="true">
          <div className="modal-dialog custom-modal-box">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Resolve Complaint</h5>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Is your complaint resolved?</p>
                <button type="submit" className="btn btn-outline-danger" onClick={handleResClick}>Yes</button>
                <button type="button" ref={closeResRef} className="btn btn-outline-success mx-3" data-dismiss="modal">No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  : <><div className="content"> Not Authorised</div></>}
    </>
  );
}

export default ResidentComplaint;

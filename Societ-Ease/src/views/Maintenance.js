
import React, { useRef, useEffect, useState } from "react";
import {
  Row,
  Col
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import MaintenanceItem from "components/Items/MaintenanceItem";
import { getMaintenance, updateMaintenance, deleteMaintenance, addMaintenance } from "api/Maintenance/maintenanceApi";

function Tables() {
  const closeref = useRef();
  const addRef = useRef();
  const editRef = useRef();
  const delRef = useRef();
  const closeDelRef = useRef();
  const [delId, setDelId] = useState("")
  const [mntData, setMntData] = useState({
        _id: "",
        maintenanceID: "",
        maintenanceSubject: "",
        maintenanceDescription: "",
        maintenanceBudget: 0,
        maintenanceStatus: "",
        maintenancePriority: "",
        __v: 0
  })

  const [mntList, setMntList] = useState({
    "success": true,
    "maintenance": [
      {
        "_id": "64301ff245e1048ac23e1a61",
        "maintenanceID": "ad48e906-72a9-444b-a364-55ff479b660b",
        "maintenanceSubject": "kkkkkkk",
        "maintenanceDescription": "jkkshjdasfjndfndsmnfndsbnf",
        "maintenanceBudget": 20000,
        "maintenanceStatus": "Ongoing",
        "maintenancePriority": "High",
        "__v": 0
      }
    ]
  })

  const updateItem = (mnt) => {
    editRef.current.click();
    setMntData(mnt)
  }

  const deleteItem = (mnt) => {
    delRef.current.click();
    setDelId(mnt.maintenanceID);
    console.log(mnt.maintenanceID)
  }

  const handleChange = (e) => {
    setMntData({ ...mntData, [e.target.name]: e.target.value })
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await updateMaintenance(mntData);
    if (response.success) {
      closeref.current.click();
      showSuccessMessage("Maintenance Updated Successfully")
      console.log(response);
      fetchAllMaintenance();
    } else {
      showErrorMessage("An Error Occurred")
      console.log(response);
    }

  }

  const handleClick = () => {
    closeDelRef.current.click();
    if (delId) handleDelete();
  }

  const handleDelete = async () => {
    console.log(delId)
    const response = await deleteMaintenance(delId);
    if (response.success) {
      console.log(response)
      showSuccessMessage("Maintenance Deleted Successfully")
      fetchAllMaintenance();
    }else{
      showErrorMessage("An Error occurred")
    }
  }



  const handleCreate = async (e) => {
    e.preventDefault()
    const response = await addMaintenance(mntData);
    if (response.success) {
      closeref.current.click();
      showSuccessMessage("Maintenance Created Successfully")
      console.log(response)
    } else {
      showErrorMessage("An Error Occurred")
      console.log(response);
    }
  }

  const fetchAllMaintenance = async () => {
    const response = await getMaintenance();
    if (response.success) {
      console.log(response);
      setMntList(response);
    } else {
      console.log(response);
    }
  }

  useEffect(() => {
    fetchAllMaintenance();
  }, [])

  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  const userType = localStorage.getItem('userType')

  return (
    
    <>
    {userType==='admin' && userDetails?
    <>
    <ToastContainer></ToastContainer>
      <div className="content w-auto h-auto">
        
        <Row>
          <Col lg="3" md="3" sm="12" className="mx-4 d-flex align-items-center justify-content-center"><FontAwesomeIcon icon={faCirclePlus} onClick={() => { addRef.current.click() }} style={{ height: "200px", color: "#7a7a7a", cursor:"pointer" }} /></Col>
          {mntList.maintenance.map((mnt)=>{
            return <>
              <MaintenanceItem updateItem={updateItem} deleteItem={deleteItem} mnt={mnt}></MaintenanceItem>
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

      {/* Create modal */}
      <div>
        <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModal" aria-hidden="true">
          <div className="modal-dialog custom-modal-box">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Maintenance</h5>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="row modal-body">
                <div className="log popup-form">
                  <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="form-box popup-form-box" style={{ height: "auto", width: "100%" }}>
                      <form className="row g-3" onSubmit={handleCreate}>
                        <div className="col-12 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Subject*</label>
                          <input type="text" name="maintenanceSubject" onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>
                        <div className="col-12 mb-4">
                          <label htmlFor="description" className="form-label mb-2">Description*</label>
                          <textarea className="form-control" name="maintenanceDescription" onChange={handleChange} placeholder="Description" id="floatingTextarea2" style={{ height: '200px' }}></textarea>
                        </div>
                        <div className="col-6 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Budget*</label>
                          <input type="text" name="maintenanceBudget" onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>
                        <div className="col-6 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Priority*</label>
                          <input type="text" name="maintenancePriority" onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>

                        <div className="col-12">
                          <button ref={closeref} type="button" className="btn" data-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-success"> Add Maintenace</button>
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
                <h5 className="modal-title" id="exampleModalLabel">Update Maintenance</h5>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="row modal-body">
                <div className="log popup-form">
                  <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="form-box popup-form-box" style={{ height: "auto", width: "100%" }}>
                      <form className="row g-3" onSubmit={handleUpdate}>
                        <div className="col-12 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Subject*</label>
                          <input type="text" name="maintenanceSubject" value={mntData.maintenanceSubject} onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>
                        <div className="col-12 mb-4">
                          <label htmlFor="description" className="form-label mb-2">Description*</label>
                          <textarea className="form-control" name="maintenanceDescription" value={mntData.maintenanceDescription} onChange={handleChange} placeholder="Description" id="floatingTextarea2" style={{ height: '200px' }}></textarea>
                        </div>
                        <div className="col-6 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Budget*</label>
                          <input type="text" name="maintenanceBudget" value={mntData.maintenanceBudget} onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>
                        <div className="col-6 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Priority*</label>
                          <input type="text" name="maintenancePriority" value={mntData.maintenancePriority} onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
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
                <h5 className="modal-title" id="exampleModalLabel">Delete Maintenance</h5>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Do you want to delete this maintenance?</p>
                <button type="submit" className="btn btn-outline-danger" onClick={handleClick}>Yes</button>
                <button type="button" ref={closeDelRef} className="btn btn-outline-success mx-3" data-dismiss="modal">No</button>
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

export default Tables;

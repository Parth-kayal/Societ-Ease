import React, { useRef, useState, useEffect } from "react";
import {
  Row,
  Col
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { getNotice, updateNotice, deleteNotice, addNotice } from "api/Notice/noticeApi";
import NoticeItem from "components/Items/NoticeItem";


function Notice() {
  const closeref = useRef();
  const addRef = useRef();
  const editRef = useRef();
  const delRef = useRef();
  const closeDelRef = useRef();
  const [delId, setDelId] = useState("")
  const [noticeData, setNoticeData] = useState({
    _id: "",
    noticeID: "",
    noticeSubject: "",
    noticeDescription: "",
    createdAt: "",
    updatedAt: "",
    __v: 0
  })

  const [noticeList, setNoticeList] = useState({
    "success": true,
    "notices": [
      {
        "_id": "642d8b32e700b17c4997263f",
        "noticeID": "3d699093-ee88-4d83-a0ed-eda24637204c",
        "noticeSubject": "This is demo subject",
        "noticeDescription": "jhkhjkfhjkdfkdjfhdkjfdsjkfdsjkfhkjdfhkjsdfjkdshfjhjkdhfjdhfskjhksdjhfkjdsfjkdsfnmsdfjkhfuhfjndsnfdsmffmdsfnsdbfdsjhfsdhfkjsn",
        "createdAt": "2023-04-05T14:52:34.158Z",
        "updatedAt": "2023-04-05T14:52:34.158Z",
        "__v": 0
      },

    ]
  })

  const updateItem = (notice) => {
    editRef.current.click();
    setNoticeData(notice)
  }

  const deleteItem = (notice) => {
    delRef.current.click();
    setDelId(notice.noticeID);
    console.log(notice.noticeID)
  }

  const handleChange = (e) => {
    setNoticeData({ ...noticeData, [e.target.name]: e.target.value })
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
    const response = await updateNotice(noticeData);
    if (response.success) {
      closeref.current.click();
      showSuccessMessage("Updated Successfully")
      console.log(response);
      fetchAllNotices();
    } else {
      showErrorMessage("An Error occurred")
      console.log(response);
    }

  }

  const handleClick = () => {
    closeDelRef.current.click();
    if (delId) handleDelete();
  }

  const handleDelete = async () => {
    console.log(delId)
    const response = await deleteNotice(delId);
    if (response.success) {
      console.log(response)
      fetchAllNotices();
      showSuccessMessage("Deleted Successfully")
    }else{
      showErrorMessage("An Error Occurred")
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const response = await addNotice(noticeData);
    if (response.success) {
      closeref.current.click();
      showSuccessMessage("Notice Created!")
      console.log(response)
    } else {
      console.log(response);
      showErrorMessage("An Error Occurred")
    }
  }

  const fetchAllNotices = async () => {
    const response = await getNotice();
    if (response.success) {
      console.log(response);
      setNoticeList(response);
    } else {
      console.log(response);
    }
  }

  useEffect(() => {
    fetchAllNotices();
  }, [])

  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  const userType = localStorage.getItem('userType')

  return (
    <>
    {userType==='admin' && userDetails? 
      <>
      <ToastContainer />
      <div className="content w-auto h-auto">
        <Row>
          <Col lg="3" md="3" sm="12" className="mx-4 d-flex align-items-center justify-content-center" ><FontAwesomeIcon icon={faCirclePlus} style={{ height: "200px", color: "#7a7a7a", cursor:"pointer"}} onClick={() => { addRef.current.click(); console.log("hello") }} /></Col>
          {noticeList.notices.map((notice) => {
            return <>
              <NoticeItem updateItem={updateItem} deleteItem={deleteItem} notice={notice} ></NoticeItem>
            </>
          })}
        </Row>

        {/* Modal activation buttons */}
        {/* Adding Notice */}
        <button className="btn d-none" ref={addRef} data-target="#addModal" data-toggle="modal">Add</button>
        {/* Update Notice */}
        <button className="btn d-none" ref={editRef} data-target="#editModal" data-toggle="modal">Edit</button>
        {/* Delete Notice */}
        <button className="btn d-none" ref={delRef} data-target="#deleteModal" data-toggle="modal">delete</button>

      </div>

      {/* Add notice modal */}
      <div>
        <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModal" aria-hidden="true">
          <div className="modal-dialog custom-modal-box">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Notice</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="row modal-body">
                <div className="log popup-form">
                  <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="form-box popup-form-box" style={{ height: "auto", width: "100%" }}>
                      <form className="row g-3" onSubmit={handleCreate}>
                        <div className="col-12 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Subject*</label>
                          <input type="text" name="noticeSubject" onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>
                        <div className="col-12 mb-4">
                          <label htmlFor="description" className="form-label mb-2">Description*</label>
                          <textarea className="form-control" name="noticeDescription" onChange={handleChange} placeholder="Body of notice" id="floatingTextarea2" style={{ height: '200px' }}></textarea>
                        </div>
                        <div className="col-12">
                          <button ref={closeref} type="button" className="btn" data-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-success"> Add Notice</button>
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

      {/* Update notice modal */}
      <div>
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
          <div className="modal-dialog custom-modal-box">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update Notice</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="row modal-body">
                <div className="log popup-form">
                  <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="form-box popup-form-box" style={{ height: "auto", width: "100%" }}>
                      <form className="row g-3" onSubmit={handleUpdate}>
                        <div className="col-12 mb-4">
                          <label htmlFor="subject" className="form-label mb-2">Subject*</label>
                          <input type="text" name="noticeSubject" value={noticeData.noticeSubject} onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                        </div>
                        <div className="col-12 mb-4">
                          <label htmlFor="description" className="form-label mb-2">Description*</label>
                          <textarea className="form-control" name="noticeDescription" value={noticeData.noticeDescription} onChange={handleChange} placeholder="Body of notice" id="floatingTextarea2" style={{ height: '200px' }}></textarea>
                        </div>

                        <div className="col-12">
                          <button ref={closeref} type="button" className="btn" data-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-success">Update</button>
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
                <h5 className="modal-title" id="exampleModalLabel">Delete notice</h5>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Do you want to delete this notice?</p>
                <button type="submit" className="btn btn-outline-danger" onClick={handleClick}>Yes</button>
                <button type="button" ref={closeDelRef} className="btn btn-outline-success mx-3" data-dismiss="modal">No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      : <div className="content"> Not Authorised</div>}
    </>
  );
}

export default Notice;

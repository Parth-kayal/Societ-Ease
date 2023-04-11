import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Col
  } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen ,faTrash,faCircleDot} from '@fortawesome/free-solid-svg-icons';
const moment = require('moment') 

function MaintenanceItem(props) {
    const {updateItem, deleteItem, mnt} = props;
    const priorityColor = mnt.maintenancePriority=="High"?'red':'green'
    const mntSubject = mnt.maintenanceSubject.length>23?mnt.maintenanceSubject.slice(0,23)+'...': mnt.maintenanceSubject;
    return (
        <>
            <Col lg="4" md="4" sm="12">
            <Card className="card-stats">
              <CardHeader>
              <CardTitle tag="h4" className="d-flex flex-row">{mntSubject}
              <div className="ml-auto">
                <FontAwesomeIcon  onClick = {()=>{updateItem(mnt)}}icon={faPen} size="sm" style={{position:"relative",right:"25px",color: "#00d6b3", cursor:"pointer"}} />
                <FontAwesomeIcon  onClick = {()=>{deleteItem(mnt)}} icon={faTrash} size="sm" style={{color: "#e4391b", cursor:"pointer"}} />
              </div>      
                </CardTitle>
                
              </CardHeader>
              <CardBody>
                <p className="card-category">{mnt.maintenanceDescription}</p>
              </CardBody>
              <CardFooter>
                <hr />
               <div className="stats d-flex flex-row">
               <div>
               <strong>Priority-</strong><FontAwesomeIcon icon={faCircleDot} style={{marginLeft:"10px",marginRight:"3px",color: `${priorityColor}`,}} /> {mnt.maintenancePriority}
               </div>
                <div className="ml-auto">
                {moment(mnt.createdAt).format('DD-MM-YYYY')}
                </div>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </>
    )
}

export default MaintenanceItem

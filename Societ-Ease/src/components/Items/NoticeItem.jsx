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
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
const moment = require('moment') 

function NoticeItem(props) {
  const { notice, updateItem, deleteItem } = props;
  const noticeSubject = notice.noticeSubject.length>23?notice.noticeSubject.slice(0,23)+'...': notice.noticeSubject;
  return (
      <Col lg="4" md="4" sm="12">
        <Card className="card-stats">
          <CardHeader>
            <CardTitle tag="h4" className="d-flex flex-row">{noticeSubject}
              <div className="ml-auto">
                <FontAwesomeIcon icon={faPen} onClick={() => { updateItem(notice) }} size="sm" style={{ position: "relative", right: "25px", color: "#00d6b3", cursor: "pointer" }} />
                <FontAwesomeIcon icon={faTrash} onClick={() => { deleteItem(notice) }} size="sm" style={{ color: "#e4391b", cursor: "pointer" }} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <p className="card-category">{notice.noticeDescription}</p>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
              <i className="fas fa-sync-alt" />{moment(notice.createdAt).format('DD-MM-YYYY')}
            </div>
          </CardFooter>
        </Card>
      </Col>
  )
}

export default NoticeItem

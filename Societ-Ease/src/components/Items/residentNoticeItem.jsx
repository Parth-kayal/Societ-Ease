import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Col
} from "reactstrap";
const moment = require('moment') 

function NoticeItem(props) {
  const { notice} = props;
  const noticeSubject = notice.noticeSubject.length>23?notice.noticeSubject.slice(0,23)+'...': notice.noticeSubject;
  return (
      <Col lg="4" md="4" sm="12">
        <Card className="card-stats">
          <CardHeader>
            <CardTitle tag="h4" className="d-flex flex-row">{noticeSubject}
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

import React, { useState, useEffect } from "react";
import {
    Row,
    Col
} from "reactstrap";
import { getNotice, } from "api/Notice/noticeApi";
import NoticeItem from "components/Items/residentNoticeItem";


function Notice() {

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

    return (
        <>
            <div className="content w-auto h-auto">
                <Row>
                    {noticeList.notices.map((notice) => {
                        return <>
                            <NoticeItem notice={notice} ></NoticeItem>
                        </>
                    })}
                </Row>
            </div>
        </>
    );
}

export default Notice;

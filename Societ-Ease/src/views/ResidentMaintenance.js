
import React, {useEffect, useState } from "react";
import {
  Row,
  Col
} from "reactstrap";
import MaintenanceItem from "components/Items/residentMaintenanceItem";
import { getMaintenance} from "api/Maintenance/maintenanceApi";

function Tables() {

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


  return (
    <>
      <div className="content w-auto h-auto">
        <Row>
          {mntList.maintenance.map((mnt)=>{
            return <>
              <MaintenanceItem mnt={mnt}></MaintenanceItem>
            </>
          })}
        </Row>
      </div>

    </>
  );
}

export default Tables;

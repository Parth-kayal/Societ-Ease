const API_URL = process.env.REACT_APP_API_URL;
const adminAuthToken = localStorage.getItem('token');

export async function addMaintenance(maintenanceData){
    const response = await fetch(`${API_URL}/api/maintenance/createmaintenance`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${adminAuthToken}`
        },
      
        body: JSON.stringify({...maintenanceData})
    });

    return await response.json();
}

export async function getMaintenance(){
    const response = await fetch(`${API_URL}/api/maintenance/getmaintenance`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },

    });

    return await response.json();
}

export async function updateMaintenance(maintenanceData){
    const response = await fetch(`${API_URL}/api/maintenance/updatemaintenance`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${adminAuthToken}`
        },
        body: JSON.stringify({...maintenanceData})
    });

    const json = await response.json();
    return json;
}

export async function deleteMaintenance(maintenanceID){
    const response = await fetch(`${API_URL}/api/maintenance/deletemaintenance`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'auth-token': `${adminAuthToken}`
        },
        body: JSON.stringify({maintenanceID})

    });

    const json = await response.json();
    return json;
}
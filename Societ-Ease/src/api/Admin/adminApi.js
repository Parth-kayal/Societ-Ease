const API_URL = process.env.REACT_APP_API_URL;
const adminAuthToken = localStorage.getItem('token');

export async function getAllResident(){
    const response = await fetch(`${API_URL}/api/admin/getallres`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${adminAuthToken}`
        },
    });

    return await response.json();
}

export async function getResident(residentID){
    const response = await fetch(`${API_URL}/api/admin/getres`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${adminAuthToken}`
        },
        body: JSON.stringify({residentID})
    });

    return await response.json();
}

export async function updateResident(residentData){

    const response = await fetch(`${API_URL}/api/admin/updateres`,{
        method: 'PUT',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${adminAuthToken}`
        },
        body: JSON.stringify({...residentData})
    });
    
    return await response.json();
}





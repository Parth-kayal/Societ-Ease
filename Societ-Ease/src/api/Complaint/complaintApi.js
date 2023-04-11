const API_URL = process.env.REACT_APP_API_URL;
const adminAuthToken = localStorage.getItem('token')
const residentAuthToken = localStorage.getItem('token');

export async function addComplaint(complaintData){
    const response = await fetch(`${API_URL}/api/complaint/createcomplaint`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${residentAuthToken}`
        },
      
        body: JSON.stringify({...complaintData})
    });

    return await response.json();
}

export async function getAllComplaints(){
    console.log(adminAuthToken)
    const response = await fetch(`${API_URL}/api/complaint/getallcomplaints`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${adminAuthToken}`
        },

    });

    // console.log(await response.json())
    return await response.json();
}

export async function getMyComplaints(){
    const response = await fetch(`${API_URL}/api/complaint/getmycomplaints`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${residentAuthToken}`
        },

    });

    return await response.json();
}

export async function updateComplaint(complaintData){
    const response = await fetch(`${API_URL}/api/complaint/updatecomplaint`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${residentAuthToken}`
        },
        body: JSON.stringify({...complaintData})
    });

    const json = await response.json();
    return json;
}

export async function deleteComplaint(complaintID){
    const response = await fetch(`${API_URL}/api/complaint/deletecomplaint`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'auth-token': `${residentAuthToken}`
        },
        body: JSON.stringify({complaintID})

    });

    const json = await response.json();
    return json;
}

export async function resolveComplaint(complaintID){
    const response = await fetch(`${API_URL}/api/complaint/resolvecomplaint`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${residentAuthToken}`
        },
        body: JSON.stringify({complaintID})
    });

    const json = await response.json();
    return json;
}
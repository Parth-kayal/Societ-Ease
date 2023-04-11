const API_URL = process.env.REACT_APP_API_URL;
const adminAuthToken = localStorage.getItem('token')

export async function addNotice(noticeData){
    const response = await fetch(`${API_URL}/api/notice/createnotice`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${adminAuthToken}`
        },
      
        body: JSON.stringify({...noticeData})
    });

    return await response.json();
}

export async function getNotice(){
    const response = await fetch(`${API_URL}/api/notice/getnotice`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },

    });

    return await response.json();
}

export async function updateNotice(noticeData){
    const response = await fetch(`${API_URL}/api/notice/updatenotice`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${adminAuthToken}`
        },
        body: JSON.stringify({...noticeData})
    });

    const json = await response.json();
    return json;
}

export async function deleteNotice(noticeID){
    const response = await fetch(`${API_URL}/api/notice/deletenotice`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'auth-token': `${adminAuthToken}`
        },
        body: JSON.stringify({noticeID})

    });

    const json = await response.json();
    return json;
}
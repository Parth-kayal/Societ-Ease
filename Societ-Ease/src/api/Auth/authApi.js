const API_URL = process.env.REACT_APP_API_URL;

export async function loginUser(credentials){
    console.log(credentials)
    console.log('...');
    const response = await fetch(`${API_URL}/api/auth/login`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({...credentials})
    });

    const res = await response.json();
    return res;
}


export async function createResident(credentials){
    const response = await fetch(`${API_URL}/api/auth/createresident`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...credentials})
    });

    const json = await response.json();
    return json;
}

export async function createGuest(credentials){
    const response = await fetch(`${API_URL}/api/auth/createguest`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...credentials})
    });

    const json = await response.json();
    return json;
}

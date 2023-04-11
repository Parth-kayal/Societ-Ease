const API_URL = process.env.REACT_APP_API_URL;
const adminAuthToken = localStorage.getItem('token')
const residentAuthToken = localStorage.getItem('token')

export async function addBill(billData){
    const response = await fetch(`${API_URL}/api/bill/createbill`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${adminAuthToken}`
        },
      
        body: JSON.stringify({...billData})
    });

    return await response.json();
}

export async function getAllBills(){
    const response = await fetch(`${API_URL}/api/bill/getallbill`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${adminAuthToken}`
        },

    });

    // console.log(await response.json())
    return await response.json();
}

export async function getMyBills(residentID){
    const response = await fetch(`${API_URL}/api/bill/getmybill`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'auth-token': `${residentAuthToken}`
        },
        body: JSON.stringify({residentID})
    });

    return await response.json();
}

export async function payBill(paymentData){
    const response = await fetch(`${API_URL}/api/bill/paybill`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${residentAuthToken}`
        },
        body: JSON.stringify({...paymentData})
    });

    const json = await response.json();
    return json;
}

export async function getMyPayments(residentID){
    const response = await fetch(`${API_URL}/api/bill/getmypayment`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${residentAuthToken}`
        },
        body: JSON.stringify({residentID})
    });

    const json = await response.json();
    return json;
}

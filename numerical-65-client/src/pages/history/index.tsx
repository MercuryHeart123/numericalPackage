import React, { useEffect } from 'react'
import axios from 'axios'
import { getHeaders, getTokenFormCookie } from '../../utill/cookieUtill'
const History = () => {
    useEffect(() => {
        const token = getTokenFormCookie();

        if (token) {
            axios.get('http://localhost:8081/api/test', getHeaders(token)
            ).then((res) => {
                console.log(res.data.data);
            }).catch((err) => {
                console.log(err.response.data)
            })
        }
    }, [])

    return (
        <div>History</div>
    )
}

export default History
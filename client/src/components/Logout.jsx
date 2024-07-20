import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Logout = ({ setRole }) => {
        const navigate = useNavigate()
        useEffect(() => {
            axios.get('http://localhost:3001/auth/Logout')
            .then(res => {
                if(res.data.logout) {
                    setRole('')
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }, [])
}

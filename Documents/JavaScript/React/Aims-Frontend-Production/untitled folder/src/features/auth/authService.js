import axios from "axios"
import {API_URL, LOGIN_URL, Node_API_URL} from "../../client";
import { toast } from "react-toastify";


const BACKEND_DOMAIN = "https://backenddd.azurewebsites.net"

const REGISTER_URL = `${Node_API_URL}/api/v1/auth/users/`
// const LOGIN_URL = `${API_URL}/api/v1/auth/jwt/create/`
const ACTIVATE_URL = `${API_URL}/api/v1/auth/users/activation/`
const RESET_PASSWORD_URL = `${API_URL}/api/v1/auth/users/reset_password/`
const RESET_PASSWORD_CONFIRM_URL = `${API_URL}/api/v1/auth/users/reset_password_confirm/`
const GET_USER_INFO = `${Node_API_URL}/api/v1/auth/users/me/`



// Register user

const register = async (userData) => {
    // try{
    // const config = {
    //     headers: {
    //         "Content-type": "application/json"
    //     }
    // }

    // const res = await axios.post(REGISTER_URL, userData, config)
    // if(res.data.response === true)
    //     {
    //       toast.success(res.data.msg);
    //       useHistory("/login")
    //       return true;
    //     }
    // else
    //     {
    //       toast.error(res.data.msg);
    //       return false;
    //     }
    // }
    // catch(e)
    // {
    //     toast.error("Network Error");
    // }
    
    
}

// Login user

const login = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const res = await axios.post(LOGIN_URL, userData, config)
    if (res.data.response === true) {
        localStorage.setItem("user", JSON.stringify(res.data.token))
    }
    return res.data
}

// Logout 

const logout = () => {
    return localStorage.clear()
    // localStorage.removeItem("user")
}

// Activate user

const activate = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const response = await axios.post(ACTIVATE_URL, userData, config)
    console.log(response.data)
    return response.data
}

// Reset Password

const resetPassword = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const response = await axios.post(RESET_PASSWORD_URL, userData, config)

    return response.data
}

// Reset Password

const resetPasswordConfirm = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, userData, config)

    return response.data
}

// Get User Info

const getUserInfo = async (accessToken) => {
     const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const response = await axios.get(GET_USER_INFO, config)
    localStorage.setItem("doc_id",response.data.user._id)

    return response.data
}



const authService = { register, login, logout, activate, resetPassword, resetPasswordConfirm, getUserInfo }

export default authService
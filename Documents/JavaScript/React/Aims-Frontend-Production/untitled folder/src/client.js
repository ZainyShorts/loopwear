export const API_URL ="https://aimsbackendgateway.icygrass-768c9b52.eastus.azurecontainerapps.io"
export const SsOCKET_URL ="wss://aimsbackendgateway.icygrass-768c9b52.eastus.azurecontainerapps.io/ws"


export const Node_API_URL ="http://localhost:4000" 
// export const SsOCKET_URL = "ws://localhost:8000/ws/
// export const Node_API_URL="http://213.210.37.77:3005" 

// export const Node_API_URL="https://codevengers.services"
// export const Node_API_URL="https://aims-backend-node-js.vercel.app";
// export const Node_API_URL="http://213.210.37.77:4000"


// export const flask_API_URL="http://localhost:3001"
export const flask_API_URL="http://213.210.37.77:5000"
// ENDPOINTS
export const REGISTER_URL = `${Node_API_URL}/api/v1/auth/users/`
export const LOGIN_URL = `${Node_API_URL}/api/v1/auth/jwt/create/`
export const GetTextFromImage = `${flask_API_URL}/extract_text_from_image`
export const demoURL = "https://alihamza.store/api"
// export const demoURL = "http://localhost:4001/api"
export const GOOGLE_SHEET = "https://sheetdb.io/api/v1/nb0x0qjwv257m/search"
export const MAIL_SERVER = "https://public-mail-server.vercel.app"
export const TAWK_VISITORS_PROPERTY_ID ='c09ecda96861b93ac9bea7bb6ee2d10b84d9cf3c'
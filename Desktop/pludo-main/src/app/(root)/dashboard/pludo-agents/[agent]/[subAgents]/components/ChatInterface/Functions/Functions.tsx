import useFetchHook from "@/hooks/apiCall"

const API_URL = process.env.NEXT_PUBLIC_PLUDO_SERVER

export const useAIFunctions = () => {
  const { fetchData } = useFetchHook()
    
  const createThread = async () => {
    const res =  await fetchData(`${API_URL}/openai/createThread`,'GET');  
    return res?.data?.id;
    } 
  const createMessage = async (data: any) => {
    try {
      const res = await fetchData(`${API_URL}/openai/createMessage `, "POST", data) 
      return res
    } catch (error) {
      console.error("Error creating message:", error)
      throw error
    }
  }

  const getRun = async (main:string , sub:string ,id: string ) => { 
    try {
      const run = await fetchData(`${API_URL}/openai/createRun `, "POST", {agent:main , type:sub, threadId:id} ) 
        return run?.data?.id
      
    } catch (error) {
      console.error("Error getting run:", error)
      throw error
    }
  } 


  const getResponse = async (threadID: string, runid: string) => {
   
    try {
      const res = await fetchData(`${API_URL}/openai/runStatus?runId=${runid}&threadId=${threadID}`, "GET")
      console.log(res);
      return res?.data?.status;
    } catch (error) {
      console.error("Error getting response:", error)
      throw error
    }
  }

  const getReply = async (threadId: string) => {
    try {
      const message = await fetchData(`${API_URL}/openai/messagesList?threadId=${threadId}`, "GET") 
      console.log(message)
      const body = message.data.body
      const reply = body.data[0].content[0].text.value
      return reply
    } catch (error) {
      console.error("Error getting reply:", error)
      throw error
    }
  } 
  const deleteThread = async (id : string) => { 
    try { 
      const res = await fetchData(`${API_URL}/openai/deleteThread?threadId=${id}`); 
      return res
    } 
    catch (e) { 
     console.error('An Error Occured Deleting Thread',e);
    }
   }

  return { 
    createThread,
    createMessage,
    getRun,
    getResponse,
    getReply, 
    deleteThread,
  }
}


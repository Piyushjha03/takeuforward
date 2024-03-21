import axios from 'axios'

const submitData = async (data) => {
    try {
     const res= await axios.post('https://takeuforward-api.vercel.app/submit', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const getData = async (page) => {
    try {
       const res = await axios.get(`https://takeuforward-api.vercel.app/getdata?page=${page}`);
       return res.data
    } catch (error) {
        return error
    }
   
}

export {submitData,getData}
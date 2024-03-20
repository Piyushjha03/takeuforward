import axios from 'axios'

const submitData = async (data) => {
    try {
     const res= await axios.post('https://takeuforward-iqu1.vercel.app/submit', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const getData = async (page) => {
    try {
       const res = await axios.post(`https://takeuforward-iqu1.vercel.app/getdata?page=${page}`);
       return res.data
    } catch (error) {
        return error
    }
   
}

export {submitData,getData}
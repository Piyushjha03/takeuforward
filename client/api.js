import axios from 'axios'

const submitData = async (data) => {
    try {
     const res= await axios.post('http://localhost:3000/submit', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const getData = async (page) => {
    try {
       const res = await axios.post(`http://localhost:3000/getdata?page=${page}`);
       return res.data
    } catch (error) {
        return error
    }
   
}

export {submitData,getData}
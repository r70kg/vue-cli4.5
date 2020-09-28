import axios from 'axios';
const serve  = axios.create({
    baseUrl:'',
    timeout:5000
})

export default serve;
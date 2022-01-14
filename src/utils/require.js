import axios from 'axios'

const require = axios.create({
  baseURL: 'http://localhost/citi-form-backend/public/index.php/',
  // baseURL: 'https://infinitymcn.com/citi/citi-form-backend/public/index.php/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default require

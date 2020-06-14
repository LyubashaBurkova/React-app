import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-2910f.firebaseio.com/'
})
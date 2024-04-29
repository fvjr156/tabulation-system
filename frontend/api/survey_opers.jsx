import axios from 'axios'

const api = {
    url: 'http://127.0.0.1:3001'
}

const GET_allSurveys = async function () {
    try {
        const response = {
            get_message: 'Data fetch successful',
            surveys: await axios.get(`${api.url}/surveys`)
        }
        return response.surveys
    } catch (error) {
        throw error
    }
}

const POST_uploadSurvey = async function (formData) {
    try {
        const response = axios.post(`${api.url}/uploadsurvey`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    } catch (error) {
        throw error
    }
}

export {GET_allSurveys, POST_uploadSurvey}
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
        await axios.post(`${api.url}/uploadsurvey`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return {success: true}
    } catch (error) {
        throw error;
        //task: handle form upload to backend, if successful, display toast success; if not, display toast error then error message
    }
}

export {GET_allSurveys, POST_uploadSurvey}
import axios from 'axios'

const api = {
    url: 'http://127.0.0.1:3001'
}

const POST_uploadImageFiles = async function (formData) {
    console.log('uploadimages')
    try {
        await axios.post(`${api.url}/uploadimagefiles`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return {success: true}
    } catch (error) {
        throw error;
    }
}

const POST_uploadSurvey = async function(surveyform_data){
    console.log(surveyform_data)
    try{
        await axios.post(`${api.url}/uploadsurvey`, surveyform_data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return {success: true}
    } catch (error) {
        throw error
    }
}

export { POST_uploadSurvey, POST_uploadImageFiles}
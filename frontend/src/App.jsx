import {PlaceholderDiv} from './pages/HelloWorld'
import {Link, useNavigate} from 'react-router-dom'

function App() {
    const navigate = useNavigate();
    return(
        <>
            <button onClick={()=>{navigate('/creator')}} style={{margin: '20px'}}>Survey Creator</button>
            <PlaceholderDiv/>
        </>
    )
}
export default App;
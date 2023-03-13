import axios from 'axios';
import buildClient from '../api/build-client';
const LandingPage = ({ currentUser }) => {
    return currentUser ? <div>You are signed in</div> :<div>You are NOT signed in</div> 
};

LandingPage.getInitialProps = async (context) => {
    const {data} = await buildClient(context).get('/api/users/currentuser').then(res=>res).catch(err=>{return {data:{}}})
    return data

};

export default LandingPage;
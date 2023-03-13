import 'bootstrap/dist/css/bootstrap.css'
import App from 'next/app'
import buildClient from '../api/build-client'
import Header from '../components/header'


const AppComponent =  ({Component,pageProps,currentUser})=>{
    console.log(Component)
    return(
        <div>
            <Header currentUser={currentUser}></Header>
            <Component {...pageProps}/>
        </div>
        
    ) 
}
AppComponent.getInitialProps = async(appContext) => {
    const client = buildClient(appContext.ctx)
    const {data} = await client.get('/api/users/currentuser').catch(err=>{return{data:{}}})
    let pageProps = {}
    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }
    return {
        pageProps,
        ...data
    }

}

export default AppComponent



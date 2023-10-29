import React, { Component, Suspense } from 'react'; 
import Home from '../Home'  
import {  
    Route, Switch, Redirect  
} from 'react-router-dom';  
export class Layout extends Component {  
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>  
    render() {  
        return (  
            <div>  
                <div id="wrapper">  
                    
                        <div id="content">  
                            
                            <Home />
                        </div>  
                        
                     
                </div>  
            </div>  
        )  
    }  
}  
  
export default Layout  
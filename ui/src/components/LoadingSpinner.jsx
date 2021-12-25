import {memo} from 'react'
import { Spinner } from 'react-bootstrap';

function LoadingSpinner(){
    console.log("spinning")
    return (
      // center spinner in middle of screen
      // <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
    <div className="overlay">
       <div className="spinner">

        <Spinner animation="border" variant="primary"/>
        {/* <div className=" spinner-border" role="status"> */}
          {/* added for accessibility */}
          <span className="visually-hidden">Loading...</span>
          
        </div>
        
        </div>

      // </div>
      
    );

  }

  export default memo(LoadingSpinner)
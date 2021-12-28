import React, {useEffect} from 'react'
import { Offcanvas, Button } from 'react-bootstrap';
export default function InstructionsModal ({showModal, setShowModal}) {
        return (
            <Offcanvas
              show={showModal}
              onHide={()=>setShowModal(false)}
        
            //   size="lg"
              
            //   className="offcanvas-bottom"
            >
              <Offcanvas.Header className="text-center" closeButton>
                <Offcanvas.Title className="w-100 fs-4">
                  Welcome!
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <h4>Plan your next float trip!</h4>
                <p>
                  ...is a tool to help you plan your next Ozark adventure. 
                </p>
              </Offcanvas.Body>
              {/* <Offcanvas.Footer>
                <Button onClick={()=>setShowModal(false)}>Close</Button>
              </Offcanvas.Footer> */}
            </Offcanvas>
          );

  
    
}

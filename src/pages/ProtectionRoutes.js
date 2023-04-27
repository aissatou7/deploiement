import React from 'react'
import "./Style2.css"
/* import { useNavigate } from "react-router-dom"; */

 function ProtectionRoutes() {
  /* const history = useHistory(); */

/*   setTimeout(() => {
    history.push("/");
    window.
  }, 3000); */

  setTimeout(() => {
    window.location.pathname = '/';
    /* setSuccess(false); */
      
    }, 4000);

  return (
    <div id='notfond'>

    </div>
  );
}

export default ProtectionRoutes;

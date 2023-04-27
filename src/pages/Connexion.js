import React, { useState }from "react";
import { useForm } from "react-hook-form";
import "./Style2.css";
import axios from "axios";
import  io from 'socket.io-client';


/* endPoint api */
const ENDPOINT = "http://localhost:5000/api/connexion";


const LoginForm = () => {
    /* const [isLoading, setIsLoading] =useState(true); */
    const [error, setErrror] = useState(null);
    const [login, setLogin] = useState(null);

    /*  hooks-form*/
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm(
        {mode:"onChange"}
      );

  //FRID
//  const  arduino = () => {
//     console.log('socket service');

//  return this.socket.fromEvent('rfid')
//   }
const socket = io('ws://localhost:5000');
const [erreurRFID, setErreurRFID] =useState(null);

socket.on('rfid', (data) => {
    console.log(data);
    if (data === 'Badge non autorisé'){

        setErreurRFID(data)   
    }else{

       localStorage.setItem('token', data)
       window.location.pathname = 'Dashboard/TableauDB';   
   } 
    
})

        
      
      /*  */
      const onSubmit = (data) => console.log("");
/* pour se connecter */
const connexion = () =>{
    /* e.prevenDefault(); */
        const data = {
            email: document.getElementById("email").value, 
            password: document.getElementById("password").value 
        }
        try{
          
            axios
            .post(ENDPOINT, data)
            .then((response)  =>{ 
                /* vérification token */
                if(response?.data?.token){
                    /* stockage du token dans localStorage */
                    localStorage.setItem('token', response?.data?.token)
                    localStorage.setItem('id', response?.data?._id)
                    /* redirection si token est bon */
                    window.location.pathname = 'Dashboard/TableauDB';
                    
                }
            })
            .then(data =>{
                /* setLogin(data) */
               /*  setIsLoading(true) */
                setErrror (null)
                
            })
            .catch(error =>{
                /* console.log(error) */
                setErrror (error.message)
               /*  setIsLoading(false) */
                // Erreur de la requête
                if (error.response) {
                // Le serveur a renvoyé une réponse avec un code d'erreur
                setErrror(error.response.data.message);
                }
        })
            }catch(err){
            console.log(err.message); //failed to match
            return err.json();           
        }
}
/*  */
    return (
        <div className="body">
            {/* div rfid  connexion*/}
            <div  className="corp ">{erreurRFID}</div>
            {/* div form connexion*/}
                <form className="corp1" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="label" >Connexion</h1>
                    <div>
                    {/* Affichage des message du server */}
                    <div id="errServer">
                        {error && <div>{error}</div>}
                    </div>
                        <div className="label">
                            <label>
                                Email
                            </label>
                        </div>
                        <div>
                        <input 
                            id="email"
                            className="input"
                            type="text" 
                            placeholder="Email" 
                            {...register("email", {
                                required: "Champ Obligatoire",
                                pattern:{
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                    message: "Format du mail incorrect",
                                } 
                            })}
                         /> 
                         {/* Message d'erreurs */}
                         {errors.email && <small className='err'>{errors.email.message }</small>}
                         </div>
                    </div>

                    <div>
                        <div className="label">
                            <label>
                                Mot de passe
                            </label>
                        </div>
                        <div>
                            <input 
                                id="password"
                                className="input"
                                type="password" 
                                placeholder="Mot de passe" 
                                {...register("password", {
                                    required: "Champ Obligatoire",
                                    minLength: {
                                    value: 5,
                                    message: "5 Caractètes au minimum"
                                    },
                                    maxLength: {
                                    value:10,
                                    message: "10 Caractètes au maximum"
                                    }
                                })}
                            />
                            {/* Message d'erreurs */}
                            {errors.password && <small className='err'>{errors.password.message }</small>}
                        </div>
                    
                    </div>
                    <button type="submit" className="login-btn" onClick={(e) =>connexion(e)}>Connexion</button>
                </form>
        </div>    
    )
};
export default LoginForm

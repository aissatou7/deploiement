import './Style1.css'
import logoOumaAgri from '../images/logo.png'
import serre from '../images/Serre.jpeg'
import image1 from '../images/imageBG1.png'
import salade from '../images/salade.png'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm } from "react-hook-form";
import  io from 'socket.io-client';
/* import { param } from '../../../api/controllers/user.ctrl'
 */
import axios from 'axios'


function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = useState('')
  const [autre, setAutre] = useState(false)
  const [debit, setDebit] = useState(false)
  const [debitdif, setDebitdif] = useState(false)
  const [humsol, setHumSol] = useState(0)
  const [lum, setLum] = useState(0)
  const [temp, setTemp] = useState(0)
  const [hum, setHum] = useState(0)
  const [heure1, setHeure1] = useState('')
  const [heure2, setHeure2] = useState('')
  const [dure, setDure] = useState('')
  const [Duredefaut, setDuredefaut] = useState('')
 // const [heuredefaut, setHeuredefaut] = useState('')
  const [choix, setChoix] = useState('')
  const [news, setNews] = useState('')
  const [seconde, setSeconde] = useState('')
  const [minute, setMinute] = useState('')
  const [heure, setHeure] = useState('')
 const [mois, setMois] = useState('')
  const [jour, setJour] = useState('')
  const [annee, setAnnee] = useState('')
  const [periode, setPeriode] = useState('')


 

      // fonction de  déconnexion
        let logout = () => {
          localStorage.removeItem('token')
          navigate('/')
      }




  const popup = () => {
    setOpen('d-block') 
     
  
  }
  const parame = ()=>{
    // localStorage.removeItem("Heure1");
    // localStorage.removeItem("Heure2");
    // localStorage.removeItem("Duree");
    // localStorage.removeItem("Duredefaut");
    // localStorage.removeItem("heuredefaut");
    // localStorage.removeItem("choix");
    // localStorage.setItem("Heure1", heure1);
    // localStorage.setItem("Heure2", heure2);
    // localStorage.setItem("Duree", dure);
    // localStorage.setItem("Duredefaut", Duredefaut);
    // localStorage.setItem("heuredefaut", heuredefaut);
    // localStorage.setItem("choix", choix);
    // localStorage.setItem("news", news);


    
    navigate ('TableauDB');
    
  
  }
  
  useEffect(() => {
/*       if (heure === "16" && minute === "49" && seconde === "00") {
 */      fetch("http://localhost:5000/api/envoi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            jour: periode,
            temperature: temp,
            humsol:  humsol,
            humserre: hum,
            luminosite: lum,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
           
          });
/*         } 
 */    }, [minute,temp,humsol,hum,lum,periode]);

  setInterval(() => repeter(), 1000);

  const repeter = () => {


    let currentDate = new Date().getDate() 
   + '/0' +(parseInt(String(new Date().getMonth())) +1) + '/0'+ new Date().getFullYear()


    let date = new Date();
    let seconde = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours();
    let mois = date.getMonth() + 1;
    let annee = date.getFullYear();
    let jour = new Date().getDate() 
    let moisStr = mois.toString()
    let jourStr = jour.toString()

    if (mois < 10) {
      moisStr = "0"+mois;
    }
    if (jour < 10) {
      jourStr = "0"+jour;
    }

    setSeconde(seconde.toString());
    setMinute(minute.toString());
    setHeure(heure.toString());
    setAnnee(annee.toString());
    setMois(moisStr);
    setJour(jourStr);

    setPeriode(currentDate.toString())


  };

  const autres = (e) => {
    setChoix(e.target.value)
    if (e.target.value === "autres") {
      setAutre(true)
      setDebit(false)
      setDebitdif(false)
    } else {
      setAutre(false)
    }
  }
  const debits = (e) => {
    if (e.target.value === "debits") {
      setDebit(true)
      setAutre(false)
    } else {
      setDebit(false)
    }
  }
  const debitdifs = (e) => {
    if (e.target.value === "debitdifs") {
      setDebitdif(true)
      setAutre(false)
    } else {
      setDebitdif(false)
    }
  }



  const socket = io('ws://localhost:5000');
  socket.on('data', (data) => {
    setHumSol(data.humsol)
      
  })
  socket.on('data', (data) =>{
    setLum(data.lum)
  })
  socket.on('data', (data) =>{
    setTemp(data.temp)
  })
  socket.on('data', (data) =>{
    setHum(data.hum)
  })


  /*--------Déclarations fonction pour Popup modicfication Mot de passe --------*/

      /* controle de saisie avec hook form */
      const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
      } = useForm(
        {mode:"onChange"}
      );

    /*  fonction (onsbmit) Modification mot de passe */
    const [mdpActuel, setMdpActuel] = useState("");
    const [mdpNouveau, setMdpNouveau] = useState("");
    /* const [mdpConfirm, setMdpConfirm] = useState(""); */
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const onSubmit  =  async (data) => {

      console.log ();


        try {
          const response = await axios.patch(`http://localhost:5000/api//modifierMdp/${localStorage.getItem("id")}`, {
            mdpActuel: data.mdpActuel,
            mdpNouveau: data.mdpNouveau,
          })
          //console.log(response.data.split(' ').join('') =="Mdp actuel incorrect");
          if(!response?.data._id){
              setError(true);
              setTimeout(() => {
                setError(false);        
                document.getElementById("mdp1").value = "";
                document.getElementById("mdp2").value = "";
                document.getElementById("mdp3").value = "";
              }, 3000);
          }else{

            setSuccess(true);
            document.getElementById("mdp1").value = "";
            document.getElementById("mdp2").value = "";
            document.getElementById("mdp3").value = "";
            setTimeout(() => {
              window.location.pathname = '/Dashboard/TableauDB';
              /* setSuccess(false); */
                
              }, 3000);
          }
          console.log(response.data);

          
        } catch (error) {
          // setError(error.response.data.message);
          console.log(error);
        }
    };


    /* Fin modification mot de passse */
    
    

    /* hooks popup */
    const [popupMdp,setPop]=useState(false);

    /* recupérer input  Mdp entrer  */
    const nouveauMdp = watch ('mdpNouveau');
 
    /* fonction afficher popup */
    const handleClickOpen=()=>{
        setPop(true)
        
    }
    /* Fonction annuler */
    const closePopup=()=>{
        setPop(false);
        window.location.reload();
    }
 /*--------Fin Déclarations fonction pour Popup modicfication Mot de passe --------*/








  return (
    <div id='entête'>

      {/* //Menu de navigation */}
      <div id='menuNav' >
        <button id="btnMenuNav"><Link to="/Dashboard/TableauDB">Tableau de bord </Link> </button>
        <button id="btnMenuNav" onClick={handleClickOpen}>Changer de Mot de passe</button> 
        <button id="btnMenuNav"> <Link onClick={() => popup()}>Paramètres Plantes</Link></button>

        <select onChange={(e) => navigate(e.target.value)} id="btnMenuNav" >
          <option >Historique</option>
          <option value='/Dashboard/ParametrePlante' >Historique des plantes</option>
          <option value='/Dashboard/Historique'>Historique de la serre</option>
        </select>
        <button id="btnMenuNav"><span className="material-symbols-outlined"  onClick={logout}>logout</span> </button>
      </div>
      {/* //logo, description et photo serre */}
      <div id='infoNav' >
        <div > <img src={logoOumaAgri} id="imageHeader" alt="Logo Ouma Agri" /></div>
        <div id="textHeader"> Sur cette application vous pourrez manipuler votre serre automatisée  et  visualiser les informations de cette dernière </div>
        <div><img src={serre} id="imageHeader" alt="serre" /></div>
      </div>
      {/* Valeur à temp réel */}
      <div id='VTR'>
        <div id="imagesVTR">
          <img src={image1} id="ImageVTR" alt="" />
          <img src={salade} alt="" id="ImageSaladeVTR" />
        </div>
        <span id="containerVTRTempérature">
          <span id="SouscontainerVTRTempérature">
            <b>Température</b>
            <br /> 27°C
          </span>
          <span id="SouscontainerVTRTempérature">
            <b>Humidité</b>
            <br />Sol : 15 %
            <br />Serre : 10%
          </span>
          <span id="SouscontainerVTRTempérature">
            <b>Luminosité</b>
            <br /> {lum} lux
          </span>
        </span>
      </div>

      {/*     parametrage plante*/}      
      <div className={`modal ${open}`} tabindex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div id='modalparam' className="modal-content">
            <div className="modal-header d-flex justify-content-center">
              <h5 className="modal-title h2">Parametre d'arrosage</h5>
              {/*  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div class="modal-body">
              <form id='param'>
                <div class='d-flex flex-column'>
                  <label class="labe1">Nom du plante</label>
                 {(!debit && !debitdif) ? <select onChange={(e) => autres(e)} id="swal-input1" class="swal2-input"
                 >
                  <option>...</option>
                    <option  onChange={(e) => setChoix(e.target.value)}>Salade</option>
                    <option  onChange={(e) => setChoix(e.target.value)}>Tomate</option>
                    <option value='autres' >Personalisé</option>
                  </select>: 
                  <input type="text" placeholder='donnez une plante' required
                  onChange={(e) => setNews(e.target.value)}
                  />}
                  

                  {!autre && <>
                    <label class="labe2">Durée en minutes</label>
                      <select id="swal-input1" class="swal2-input"
                      onChange={(e) => setDuredefaut (e.target.value)}
                     >
                      <option>...</option>
                      <option>2</option>
                      <option>4</option>
                      <option>6</option>
                    </select>
                  </>}

                  {!debit && !debitdif && !autre && <>
                    <label class="labe3">Heure d'arrosage</label>
                    <select id="swal-input1" class="swal2-input"
                    onChange={(e) => setHeure1 (e.target.value)}

                    >
                      <option>...</option>
                      <option>8</option>
                      <option>9</option>
                      <option>11</option>
                    </select>
                  </>}

                  {
                    autre && <>
                      <div class="d-flex justify-content-center mt-4 gap-3">
                        <button onClick={(e) => debits(e)} class="md" value='debits'>même debit</button>

                        <button onClick={(e) => debitdifs(e)} class="md" value='debitdifs'>débits différents</button>
                      </div>
                    </>
                  }
                  {
                    debit && <>
                     
                      <label class="labe2">Premiere Heure</label>
                      <select id="swal-input1" class="swal2-input"
                      onChange={(e) => setHeure1 (e.target.value)}

                      >
                        <option>...</option>
                        <option>8</option>
                        <option>10</option>
                        <option>12</option>
                      </select>
                      <label class="labe2">Deuxiéme Heure</label>
                      <select id="swal-input1" class="swal2-input"
                            onChange={(e) => setHeure2 (e.target.value)}

                      >
                        <option>...</option>
                        <option>16</option>
                        <option>18</option>
                        <option>19</option>
                      </select>
                    </>
                  }
                  {
                    debitdif && <>
                
                      <label class="labe2">Premiere Heure</label>
                      <select id="swal-input1" class="swal2-input"         
                      onChange={(e) => setHeure1 (e.target.value)}
>
                        <option>...</option>
                        <option>8</option>
                        <option>10</option>
                        <option>12</option>
                      </select>

                      <label class="labe2">Durée en minutes</label>
                      <select id="swal-input1" class="swal2-input"
                        onChange={(e) => setDure (e.target.value)}

                      >
                      <option>...</option>
                      <option>2</option>
                      <option>4</option>
                      <option>6</option>
                      </select>
                      <label class="labe2">Deuxiéme Heure</label>
                      <select id="swal-input1" class="swal2-input"
                          onChange={(e) => setHeure2 (e.target.value)}

                      > 
                      <option>...</option>
                        <option>16</option>
                        <option>18</option>
                        <option>19</option>
                      </select>
                    </>

                  }


                  <div class="d-flex gap-2 justify-content-center mt-5">
                    <button onClick={() => setOpen('')} class="butA">Annuler</button>                    
                    <button onClick={()=>{parame()}} class="btn btn-success" className='butM'>Modifier</button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>













       {/*----------------Corp Popup Modification mot de passe -------------------------*/}


       <div id='main'>
            {
            popupMdp?
            <div className="popup">
                    <div /* className="mdpForm" */>
                        <div className="popup-header">      
                        </div> 
                        <form  onSubmit={handleSubmit(onSubmit)}>
                          {/* afficher un message d'erreur s'il y en a un */}
                          {error && <p id='errMdp'>Votre mot de passe actuel est incorrect ! </p>}
                          {/*  */}
                          {/* afficher un message de succès si la modification s'est bien déroulée */}
                            {success && (
                              <div id='successMdp'>
                                Votre mot de passe a été modifié avec succès !
                              </div>
                            )}
                                {/*  */}
                                <div>
                                    <label className="mdpLabel">Actuel Mot de Passe</label>
                                </div>
                                <div>
                                    <input 
                                        className="mdpInput"
                                        placeholder="..."
                                        id='mdp1'
                                        type="password"
                                        defaultValue={mdpActuel}
                                        onChange={(e) => setMdpActuel(e.target.value)}
                                        {...register("mdpActuel", {
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
                                    {errors.mdpActuel && <small className='err'>{errors.mdpActuel.message }</small>}
                                </div>  
                                <div>
                                    <div>
                                        <label className="mdpLabel">nouveau Mot de Passe</label>
                                    </div>
                                    <input 
                                        className="mdpInput"
                                        type="password"
                                        id='mdp2'
                                        placeholder="..."
                                        defaultValue={mdpNouveau}
                                        onChange={(e) => setMdpNouveau(e.target.value)}
                                        {...register("mdpNouveau", {
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
                                    />{/* Message d'erreurs */}
                                    {errors.mdpNouveau && <small className='err'>{errors.mdpNouveau.message }</small>}
                                </div>
                                <div>
                                    <label className="mdpLabel">Confirmation Mot de Passe</label>
                                </div>
                                <div>
                                    <input 
                                        className="mdpInput"
                                        placeholder="..."
                                        type="password"
                                        id='mdp3'
                                        {...register("mdpConfirm", {
                                          required: "Champ Obligatoire",
                                          
                                          minLength: {
                                            value: 1,
                                            message: ""
                                          },

                                          validate: (value) => 
                                          value === nouveauMdp || "Les mots de passe ne conrrespondent pas !",
                                      })}
                                    />
                                    {/* Message d'erreurs */}
                                    {errors.mdpConfirm && <small className='err'>{errors.mdpConfirm.message }</small>}
                                </div>
                            <div className="mdpBtn">
                                <button onClick={closePopup} className=" btnAnnuler">Annuler</button>
                                <button type="submit" className="btnModifier">  Modifier</button>
                            </div>
                            
                        </form>
                    </div>
            </div>:""
            }
        </div>
        {/*--------------------------- Fin Corp Pop UP modififaction Mot de passe------------------- */}

    </div>






  )
}

export default Header;
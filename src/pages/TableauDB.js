import React, { useEffect, useState } from 'react'
import './Style2.css'
import porteO from '../images/porteO.png'
import porteF from '../images/porteF.png'
import extracteurOn from '../images/extracteurOn.gif'
import extracteurOff from '../images/extracteurOff.png'
import insectAbsent from '../images/insectAbsent.png'
import insectPresent from '../images/insectPresent.png'
import toitO from '../images/toitO.png'
import toitF from '../images/toitF.png'
import nonArrosage from '../images/nonArrosage.png'
import arrosage from '../images/arrosage.gif'
import io from 'socket.io-client'


const TableauDB = () => {
  let extracteur = "Éteint"
  
 

const socket = io('ws://localhost:5000')

// /////////////////////// insecte ////////////////
let [etatInsectes, setEtatInsectes] = useState(false);

socket.on('insecte', (data) =>{
 if(data === 'Present'){
  setEtatInsectes(true) 
 }else{
  setEtatInsectes(false)
 }
})

//////////////////// POrte ///////////////////:
let [etatPorte, setEtatPorte] = useState(false);
socket.on('porte', (data) =>{
 if(data === 'ouverte'){
  setEtatPorte(true)
 }else if (data === 'fermee'){
  setEtatPorte(false)
 }
})

//////////////////// EXTRACTEUR ///////////////////:
let [etatExtracteur, setEtatExtracteur] = useState(false);
socket.on('Extracteur', (data) =>{
 if(data === 'ouverte'){
  setEtatExtracteur(true)
 }else{
  setEtatExtracteur(false)
 }
})

//////////////////// Fenêtre ///////////////////:
let [etatFenetre, setEtatFenetre] = useState(false);
socket.on('fenetre', (data) =>{
 if(data === 'ouverte'){
  setEtatFenetre(true)
 }else  if(data === 'fermee'){
  setEtatFenetre(false)
 }
})

//////////////////// Arrosae ///////////////////:
let [etatPompe, setEtatPompe] = useState(true);
socket.on('Pompe', (data) =>{
 if(data === 'ouverte'){
  setEtatPompe(true)
 }else  if(data === 'fermee'){
  setEtatPompe(false)
 }
})



 function turON(){
 socket.emit('message', { message: 'ON' })
 }
 function turOFF(){
  socket.emit('message', { message: 'OFF' })
  }
  



 
  
  
  return (
    <div id='containerGeneralDash2'>
      <div>
      <div class='headerDash2'>États</div>
      <div class='containerDash2'>

         {!etatPorte ? <div class='elementDash2'>
            <h5>Porte</h5>
            <img src={porteO} class="imageDash2" alt="" />
            <h5> Ouverte</h5>
          </div> :
          <div class='elementDash2'>
            <h5>Porte</h5>
            <img src={porteF} class="imageDash2" alt="" />
            <h5> Fermée</h5>
          </div>}

          {!etatExtracteur ? 
          <div class='elementDash2'>
          <h5>Extracteur</h5>
          <img src={extracteurOff} class="imageDash2" alt="" />
          <h5> Fermée</h5>
        </div>:
          <div class='elementDash2'>
            <h5>Extracteur d'air</h5>
            <img src={extracteurOn} class="imageDash2" alt="" />
            <h5> Ouverte</h5>
          </div> 
          }

          {!etatInsectes ? <div class='elementDash2'>
            <h5>Présence d'insectes</h5>
            <img src={insectAbsent} class="imageDash2" alt="" />
            <h5> Absent</h5>
          </div> :
          <div class='elementDash2'>
            <h5>Présence d'insectes</h5>
            <img src={insectPresent} class="imageDash2" alt="" />
            <h5> Présent</h5>
          </div>}
      </div>
      </div>
      <div >
      <div class='headerDash2C '>Contrôles</div>
      <div class='containerDash2C '>
          {! etatFenetre ?
           <div class='elementDash2 '>
           <h5>Toit de la serre</h5>
           <img src={toitF} class="imageDash2" alt="" />
           <div class='btnDash'>
            <button class="btn btn-success" onClick={ turON()}> Ouvrir</button>
           </div>
         </div>:
           <div class='elementDash2 '>
            <h5>Toit de la serre</h5>
            <img src={toitO} class="imageDash2" alt="" />
            <div class='btnDash'>
           <button class="btn btn-danger" onClick={ turOFF()} > Fermer</button>
            </div>
          </div>}

          {! etatPompe ?
           <div class='elementDash2 '>
           <h5>Arrosage</h5>
           <img src={nonArrosage} class="imageDash2" alt="" />
           <div class='btnDash'>
            <button class="btn btn-success" onClick={turON()}> Ouvrir</button>
           </div>
         </div>:
           <div class='elementDash2 '>
            <h5>Toit de la serre</h5>
            <img src={arrosage} class="imageDash2" alt="" />
            <div class='btnDash'>
           <button class="btn btn-danger" onClick={turOFF()} > Fermer</button>
            </div>
          </div>}
          
      </div>
    </div>
    </div>
  )}


export default TableauDB
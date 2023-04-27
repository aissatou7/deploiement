/* import React, { useState, useEffect } from "react";
import "./Style2.css";
import axios from 'axios';


  
  function Historiques() {
    const [historiqueData, setHistoriqueData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchDate, setSearchDate] = useState('');

  
    useEffect(() => {
      axios.get("http://localhost:5000/api/recu")
        .then(response => {
          setHistoriqueData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    
  
    // Calcul du nombre total de pages
    const pageCount = Math.ceil(historiqueData.length / itemsPerPage);
  
    // Fonction pour passer à la page suivante
    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    // Fonction pour passer à la page précédente
    const handlePrevPage = () => {
      setCurrentPage(currentPage - 1);
    };
  
    // Fonction pour changer de page
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    // Index de départ pour l'affichage des données
    const startIndex = (currentPage - 1) * itemsPerPage;
  
    // Index de fin pour l'affichage des données
    const endIndex = startIndex + itemsPerPage;
  
    return (
      <div>
        <h1>Historique des données</h1>
        <table classe="historique">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Température</th>
              <th>Humidité sol</th>
              <th>Humidité serre</th>
              <th>Luminosité</th>
            </tr>
          </thead>
          <tbody>
            {historiqueData.slice(startIndex, endIndex).map((data, index) => (
              <tr key={index}>
                <td>{data.jour}</td>
                <td>{data.temperature}</td>
                <td>{data.humsol}</td>
                <td>{data.humserre}</td>
                <td>{data.luminosite}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {currentPage > 1 && (
            <button onClick={handlePrevPage}>Précédent</button>
          )}
          {currentPage < pageCount && (
            <button onClick={handleNextPage}>Suivant</button>
          )}
        </div>
      </div>
    );
  }
  
  export default Historiques;
   */
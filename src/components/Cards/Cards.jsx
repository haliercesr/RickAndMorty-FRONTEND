import Card from '../../components/Card/Card'
import styles from '../Cards/Cards.module.css'
import React from 'react';
import giftWelcome from '../../gifts/rick-and-morty-dance.gif'
import { counts } from '../redux/actions/actions';
import { useEffect,useState } from 'react';
import Alert from '../Alert/Alert';







export default function Cards(props) {
   const { characters, onClose,showCustomAlert,closeCustomAlert } = props
  const[showWelcome,setShowWelcome]=useState(false)


   return <div className={styles.Cards}  >
       {showCustomAlert? <Alert
        message="ID invalido, porfavor intentalo de nuevo!"
        onClose={closeCustomAlert}
      />:null}
      <div className={styles.CardsConteinerH}>
         <div className={characters.length>0 || showWelcome ? styles.WelcomeNone : styles.Welcome}>
            <div className={styles.DivCard}>
               <div className={styles.Divboton}>
                  <button className={styles.buttonONClose} onClick={() => { setShowWelcome(true)}
                  } >X</button>
               </div>
               <p>
                  ¡Bienvenido a la aplicación de Rick y Morty!
                  Aquí tienes acceso a varias funciones interesantes:
                  <br></br>
                  - <span class="icon">🔍</span> Haz clic en el icono de la lupa para buscar a tu personaje favorito.
                  <br></br>
                  - <span class="icon">🎲</span> Prueba la búsqueda aleatoria con el botón de dados para descubrir personajes sorprendentes.
                  <br></br>
                  - <span class="icon">ℹ️</span> Si deseas saber más sobre esta aplicación, visita la sección "Acerca de mí".
                  <br></br>
                  - <span class="icon">❌</span> Y si decides cerrar sesión, simplemente haz clic en el botón de salida.
                  <br></br>
                  Esperamos que disfrutes explorando el universo de Rick y Morty con nuestra aplicación. ¡Diviértete! 🚀🌌
               </p>
               <div className={styles.giftDance}>
                  <img src={giftWelcome} />
               </div>


            </div>
         </div>
         {characters.map((element) => {
            return <Card
               key={element.id}
               id={element.id}
               name={element.name}
               status={element.status}
               species={element.species}
               gender={element.gender}
               origin={element.origin}
               image={element.image}
               onClose={onClose}

            />
         })}
      </div>

   </div>;
}












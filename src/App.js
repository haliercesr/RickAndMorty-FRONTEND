//Commons imports
import { useState,useEffect} from 'react';
import axios from 'axios';
import { Route, Routes, useLocation,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFav } from './components/redux/actions/actions'; 

//Styles
import './App.css';
//Components
import Cards from '../src/components/Cards/Cards'
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import audio from '../src/SD_NAVIGATE.wav';
import Favorites from './components/Favorites/Favorites';
import Registro from "./components/Register/Registro";




function App(props) {

   const navigate = useNavigate()
   const[access,setAccess] =useState(false)
   const audio1 = document.getElementById("audio");
   const dispatch=useDispatch()
   //const URLSERVER='http://localhost:3001/'
   const URLSERVER='https://rickandmorty-backend-production.up.railway.app/'   //esta URL la uso para el deploy con Railway
   const [showCustomAlert, setShowCustomAlert] = useState(false);

   const openCustomAlert = () => {
     setShowCustomAlert(true);
   };

   const closeCustomAlert = () => {
      setShowCustomAlert(false);
    };

   const login= async (userData) =>{
   /* 
      axios(URLSERVER+`?email=${userData.email}&password=${userData.password}`)
      .then(({data})=>{
       const {access}=data
       setAccess(access)
      })
      .catch((error)=>window.alert("Usuario y/o contraseña invalidos"))
   */
   //AHORA LO HACEMOS CON ASYNC Y AWAIT
   try{
      const {data}= await axios(URLSERVER+`?email=${userData.email}&password=${userData.password}`)
      const {access}=data
       setAccess(access)      //tambien puedo eliminar el useeffect y usar el navigate en esta funcion, tambien se puede crear un loginout (se ejecuta cuando el usuario y contraseña no son validas), una funcion que tenga un navigate hacia el inicio 
   }catch(error){openCustomAlert()}
}

useEffect(()=>{
   !access && navigate("/")
},[access])
         

  

   const[characters,setCharacters]=useState([])
   const[Id,setId]=useState([])
   
   const onSearch= async (id)=>{
      audio1.play()
      let array=[]
      array=Id.filter((char)=>char===id)
      
      if(array.length===0){     
   
      //solicitud a la API
      /*
      axios(`http://localhost:3001/character/${id}`).then(({ data }) => {  //la respuesta de axios segun la documentacion es un objeto con muchas propiedades
   
       if (data.name) {
       setCharacters((oldChars) => [...oldChars, data]);
       setId((Id) =>[...Id, id])
        }
       } )
       .catch((error)=>{window.alert('¡No hay personajes con este ID!');});
      }
       */
      //AHORA LO HACEMOS CON ASYNC Y AWAIT
      try{
         const {data}= await axios(`http://localhost:3001/character/${id}`)
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
            setId((Id) =>[...Id, id])
            }
      }catch(error){openCustomAlert()}
       //
      }
      
   }   
                  
               
   
   
   const onClose =(id)=>{
      
      audio1.play();
      
      if (location.pathname==="/Favorites") dispatch(removeFav(id))
      if (location.pathname==="/home") {
      dispatch(removeFav(id))
      const characterfiltered=characters.filter((char)=>{return char.id !== Number(id)
      })
      setCharacters(characterfiltered)
      const idfiltrado=Id.filter((char)=>{return char===id})
      setId(idfiltrado)
      //setCharacters(characters.filter((char)=>{char.id!==Number(id)}))
   }
   }

   
   const location=useLocation()
   const nav=()=>{
      
   if(location.pathname!=="/" && location.pathname!=="/Register") {return <NavBar SubmitSound={audio1} onSearch={onSearch}/>}
   }
   


   return (
          

        <div className="App">
           <audio id="audio" controls>
           <source type="audio/wav" src={audio}/>
           </audio>
           {nav()}
           
           <Routes>
            <Route path='/' element={<Form closeCustomAlert={closeCustomAlert} showCustomAlert={showCustomAlert} login={login} SubmitSound={audio1} access={access} navigate={navigate}/>}/>
            <Route path="/home" element={<Cards closeCustomAlert={closeCustomAlert} showCustomAlert={showCustomAlert} characters={characters} onClose={onClose}/>} />
            <Route path="/About" element={<About/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/favorites" element={<Favorites onClose={onClose} />}></Route>
            <Route path="/Register" element={<Registro SubmitSound={audio1} navigate={navigate}/>}/>
           </Routes>

        </div>
   );
}

export default App;

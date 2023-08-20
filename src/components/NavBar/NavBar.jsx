import  {useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import './NavBar.css';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addFav } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
//import audio1 from '../../MP3SONGS/audio1.mp3'
import '@fortawesome/fontawesome-free/css/all.css'





const NavBar = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { onSearch, SubmitSound } = props;
    const allCharacters = useSelector(state => state.allCharacters)
   // const songs = [audio1];
   // const [cancionIndex, setCancionIndex] = useState(0);
   

 //   const handleNextSong = () => {
   //     setCancionIndex((cancionIndex + 1) % songs.length);
    //  };

   

    useEffect(() => {
        dispatch(addFav({ id: 0 }))
    }, [dispatch])


    const HomeNav = () => {

        return <>

            <SearchBar SubmitSound={SubmitSound} onSearch={onSearch} />
            <Link to='/about'>
                < button id="bt1Home" onClick={() => { SubmitSound.play() }}>
                    <span > About
                    </span></button>
            </Link>

            < button id="salirHome" onClick={() => {
                SubmitSound.play()
                window.location.reload()
            }
            }>
                <span > Salir
                </span></button>

            <Link to='/Favorites'>
                <button id="bt3Home" onClick={() => { SubmitSound.play() }}>
                    {
                        allCharacters.length > 0 ? (
                            <span>❤️</span>
                        ) : (
                            <span >🤍</span>
                        )
                    }
                    <span >{allCharacters.length}</span>
                </button>
            </Link>
        </>
    }

    const Favorites = () => {
        return <>
            <Link to='/about'>
                < button id="bt1Favorite" onClick={() => { SubmitSound.play() }}>
                    <span > About
                    </span></button>
            </Link>
            <Link to='/home'>
                <button id="bt2Favorite" onClick={() => { SubmitSound.play() }}>
                    <span > Home
                    </span></button>
            </Link>

        </>
    }

    const Detail = () => {
        return <>
            <Link to='/about'>
                < button id="bt1Detail" onClick={() => { SubmitSound.play() }}>
                    <span > About
                    </span></button>
            </Link>
            <Link to='/Favorites'>
                <button id="bt3Detail" onClick={() => { SubmitSound.play() }}>
                    {
                        allCharacters.length > 0 ? (
                            <span>❤️</span>
                        ) : (
                            <span >🤍</span>
                        )
                    }
                    <span >{allCharacters.length}</span>
                </button>
            </Link>
            <Link to='/home'>
                <button id="bt2Detail" onClick={() => { SubmitSound.play() }}>
                    <span > Home
                    </span></button>
            </Link>

        </>
    }

    const About = () => {
        return <>
            <Link to='/home'>
                <button id="bt2About" onClick={() => { SubmitSound.play() }}>
                    <span > Home
                    </span></button>
            </Link>
            <Link to='/Favorites'>
                <button id="bt3About" onClick={() => { SubmitSound.play() }}>
                    {
                        allCharacters.length > 0 ? (
                            <span>❤️</span>
                        ) : (
                            <span >🤍</span>
                        )
                    }
                    <span >{allCharacters.length}</span>
                </button>
            </Link>

        </>
    }

    

    return <div className="nav">
       
        {location.pathname === "/home" ? (HomeNav()) : null}
        {location.pathname === "/Favorites" ? (Favorites()) : null}
        {location.pathname === "/about" ? (About()) : null}
        {location.pathname.startsWith("/detail/") ? (Detail()) : null}
    </div>
}
export default NavBar;

//PARA "{location.pathname.startsWith("/detail/") ? (Detail()) : null}  SE PUEDE USAR .startsWith O .includes"

//<div className="contenedorReproductor">
//<audio className="Reproductor"controls autoPlay >
//    <source src={songs[1]} type="audio/mp3" />
//    Tu navegador no soporta la reproducción de audio.
//</audio>
//</div>
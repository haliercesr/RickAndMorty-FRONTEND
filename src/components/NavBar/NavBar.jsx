import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import './NavBar.css';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addFav } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
//import audio1 from '../../MP3SONGS/audio1.mp3'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css';





const NavBar = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { onSearch, SubmitSound, setAccess } = props;
    const allCharacters = useSelector(state => state.allCharacters);
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
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
           
                <div className="pos-f-t">
                    <nav className="navbar navbar-dark bg-dark">
                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={toggleCollapse}
                            aria-expanded={!isCollapsed}
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </nav>
                    <div className={`collapse ${isCollapsed ? '' : 'show'}`} id="navbarToggleExternalContent">
                        <div className="bg-dark p-4">
                            <h4 className="text-white">Collapsed content</h4>
                            <span className="text-muted">Toggleable via the navbar brand.</span>
                        </div>
                    </div>
                </div>
           

            <SearchBar SubmitSound={SubmitSound} onSearch={onSearch} />
            <Link to='/about'>
                < button id="bt1Home" onClick={() => { SubmitSound() }}>
                    <span > About
                    </span></button>
            </Link>

            < button id="salirHome" onClick={() => {

                SubmitSound()
                setAccess(false) //tengo que cambiar el estado de access en app porque cuando me dirijo a el inicio, access sigue en true entonces el video quiere reproducirse.
                navigate("/")

            }
            }>
                <span > Salir
                </span></button>

            <Link to='/Favorites'>
                <button id="bt3Home" onClick={() => { SubmitSound() }}>
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
                < button id="bt1Favorite" onClick={() => { SubmitSound() }}>
                    <span > About
                    </span></button>
            </Link>
            <Link to='/home'>
                <button id="bt2Favorite" onClick={() => { SubmitSound() }}>
                    <span > Home
                    </span></button>
            </Link>

        </>
    }

    const Detail = () => {
        return <>
            <Link to='/about'>
                < button id="bt1Detail" onClick={() => { SubmitSound() }}>
                    <span > About
                    </span></button>
            </Link>
            <Link to='/Favorites'>
                <button id="bt3Detail" onClick={() => { SubmitSound() }}>
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
                <button id="bt2Detail" onClick={() => { SubmitSound() }}>
                    <span > Home
                    </span></button>
            </Link>

        </>
    }

    const About = () => {
        return <>
            <Link to='/home'>
                <button id="bt2About" onClick={() => { SubmitSound() }}>
                    <span > Home
                    </span></button>
            </Link>
            <Link to='/Favorites'>
                <button id="bt3About" onClick={() => { SubmitSound() }}>
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
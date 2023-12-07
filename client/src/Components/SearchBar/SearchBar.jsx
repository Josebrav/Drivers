import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { orderCards, filterAPIorDB, filterName, filterTeam, getAllDrivers } from "../Redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import style from '../SearchBar/SearchBar.module.css'

export default function SearchBar() {
    const [name, setName] = useState("");
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState("");

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:3001/teams');
                setTeams(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTeams();
    }, []);



    const dispatch = useDispatch()


    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleFilterName(name);
        }
    };

    const handleOrder = event => {
        dispatch(orderCards(event.target.value));
    };

    const handleFilterName = (name) => {
        dispatch(filterName(name));
    };

    const handleFilterAPIorDB = event => {
        dispatch(filterAPIorDB(event.target.value));
    }
    const handleTeamChange = (event) => {
        const selectedTeam = event.target.value;
        setTeam(selectedTeam);
        dispatch(filterTeam(selectedTeam));
      };

     const handleResetFilters = (event) => {
         dispatch(getAllDrivers())
     }

    return (
        <div className={style.searchBarContainer}>
            <div className={style.buttonContainer}>
                <Link to="/home">
                    <button>Home</button>
                </Link>

                <Link to="/form">
                    <button>Crear driver</button>
                </Link>
            </div>
            <div className={style.inputContainer}>
            <input
                    type='search'
                    value={name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar driver por nombre"
                />

            </div>

            <label>Ordenar por:</label>
            <select name="filterAPIorDB" id="filterAPIorDB" onChange={handleFilterAPIorDB}>
                <option value="ALL">Traer todos</option>
                <option value="DB">Drivers DB</option>
                <option value="API">Drivers API</option>
            </select>


            <select name="order" id="order" onChange={handleOrder}>
                <option value="A">A-Z</option>
                <option value="D">Z-A</option>
                <option value="Dob">Fecha de nacimiento</option>
            </select>


            <select name="teamFilter" id="teamFilter" onChange={handleTeamChange} value={team}>
                {teams.map((teamOption, index) => (
                    <option key={index} value={teamOption}>
                        {teamOption}
                    </option>
                ))}
            </select>

            <button onClick={()=>{handleResetFilters()}}>Reset filters</button>
        </div>
    )
}
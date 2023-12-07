import { useState, useEffect } from "react";
import styles from '../Form/Form.module.css';
import validation from '../Form/validation';
import axios from "axios";
import Select from "react-select";

export default function Form() {


    const [userData, setUserData] = useState({
        forename: "",
        surname: "",
        nationality: "",
        image: "",
        dob: "",
        description: "",
        teams: []
    });
    const [teams, setTeams] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const handleChange = (event) => {
        setErrors(validation({ ...userData, [event.target.name]: event.target.value }))
        setUserData((prevUserData) => ({ ...prevUserData, [event.target.name]: event.target.value }));
    };

    const handleChangeTeams = (selectedOptions) => {
        const selectedTeams = selectedOptions.map((option) => option.value);
        setUserData((prevUserData) => ({ ...prevUserData, teams: selectedTeams }));
    };

    const handleSubmit = async (event) => {
        try {
            await axios.post("http://localhost:3001/drivers", userData);
        } catch (error) {
            alert("El driver con esos datos ya existe");
        }
    };


    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:3001/teams');
                const teamOptions = response.data.map((team) => ({ value: team, label: team }));
                setTeams(teamOptions);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTeams();
    }, []);

    useEffect(() => {
        const hasErrors = Object.values(errors).some(Boolean);
        setSubmitDisabled(hasErrors);
    }, [errors]);
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <label className={styles.label}>Nombre: </label>
                <input
                    type="text"
                    onChange={handleChange}
                    name="forename"
                    className={styles.input}
                    placeholder="Ingrese el nombre"
                />
                {errors.forename1 ? <p>{errors.forename1}</p> :
                    errors.forename2 ? <p>{errors.forename2}</p> :
                    errors.forename3 ? <p>{errors.forename3}</p>: null}

                <label className={styles.label}>Apellido: </label>
                <input
                    type="text"
                    onChange={handleChange}
                    name="surname"
                    className={styles.input}
                    placeholder="Ingrese el apellido"
                />
                {errors.surname1 ? <p>{errors.surname1}</p> :
                    errors.surname2 ? <p>{errors.surname2}</p> :
                    errors.surname3 ? <p>{errors.surname3}</p>: null}

                <label className={styles.label}>Nacionalidad:</label>
                <input
                    type="text"
                    onChange={handleChange}
                    name="nationality"
                    className={styles.input}
                    placeholder="Ingrese la nacionalidad"
                />
                {errors.nationality1 ? <p>{errors.nationality1}</p> :
                    errors.nationality2 ? <p>{errors.nationality2}</p> :
                    errors.nationality3 ? <p>{errors.nationality3}</p>: null}

                <label className={styles.label}>Imagen: </label>
                <input
                    type="text"
                    onChange={handleChange}
                    name="image"
                    className={styles.input}
                    placeholder="Ingrese la url de la imagen"
                />
                {errors.image1 ? <p>{errors.image1}</p> : null}

                <label className={styles.label}>Fecha de nacimiento: </label>
                <input
                    type="date"
                    onChange={handleChange}
                    name="dob"
                    className={styles.input}
                    placeholder="Ingrese la fecha de nacimiento"
                />
                {errors.dob1 ? <p>{errors.dob1}</p> : null}

                <label className={styles.label}>Descripción: </label>
                <input
                    type="text"
                    onChange={handleChange}
                    name="description"
                    className={styles.input}
                    placeholder="Ingrese una descripción del driver"
                />
                {errors.description1 ? <p>{errors.description1}</p> :
                    errors.description2 ? <p>{errors.description2}</p> : null}

                <label className={styles.label}>Teams: </label>
                <Select
                    isMulti
                    options={teams}
                    onChange={handleChangeTeams}
                    value={teams.filter((team) => userData.teams.includes(team.value))}
                />
                
                <button type="submit" disabled={submitDisabled}>Submit</button>
            </form>
        </div>
    )
}

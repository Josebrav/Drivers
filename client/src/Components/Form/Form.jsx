import { useState, useEffect } from "react";

import validation from '../Form/validation';
import axios from "axios";
import Select from "react-select";
import { Input, Button, FormControl, FormLabel, FormErrorMessage, Box, Textarea } from "@chakra-ui/react";

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
                const teamOptions = response.data.map((team) => ({ value: team, FormLabel: team }));
                setTeams(teamOptions);
            } catch (error) {
                alert("No se pudieron cargar los teams")
            }
        };

        fetchTeams();
    }, []);

    useEffect(() => {
        const hasErrors = Object.values(errors).some(Boolean);
        setSubmitDisabled(hasErrors);
    }, [errors]);
    return (
        
            <Box
                bg={'rgb(233 20 20 )'}
                display={"flex"}
                flexDirection="column"  // Cambié a columna para alinear elementos verticalmente
                w={"300px"}
                mx="auto"  // Para centrar horizontalmente
                mt="40px"
                mb={"0px"}  // Ajusta según tus necesidades
                borderRadius={"20px"}
                p="6"  // Añadí padding para mejorar la apariencia
                justifyContent="center"  // Para centrar verticalmente
            >
                <form onSubmit={handleSubmit}>
                    <FormControl ml={"70px"}>
                        <FormLabel ml={"53px"} color={"black"}>Nombre: </FormLabel>
                        <Input
                            type="text"
                            onChange={handleChange}
                            name="forename"
                            borderRadius={"30px"}
                            placeholder="Ingrese el nombre"
                        />
                        {errors.forename1 ? <p>{errors.forename1}</p> :
                            errors.forename2 ? <p>{errors.forename2}</p> :
                                errors.forename3 ? <p>{errors.forename3}</p> : null}
                    </FormControl>
                    <FormControl ml={"70px"}>
                        <FormLabel ml={"50px"} color={"black"}>Apellido: </FormLabel>
                        <Input
                            type="text"
                            onChange={handleChange}
                            name="surname"
                            borderRadius={"20px"}
                            placeholder="Ingrese el apellido"
                        />
                        {errors.surname1 ? <p>{errors.surname1}</p> :
                            errors.surname2 ? <p>{errors.surname2}</p> :
                                errors.surname3 ? <p>{errors.surname3}</p> : null}
                    </FormControl>
                    <FormControl ml={"70px"}>
                        <FormLabel ml={"35px"} color={"black"}>Nacionalidad:</FormLabel>
                        <Input
                            type="text"
                            onChange={handleChange}
                            name="nationality"
                            borderRadius={"20px"}
                            placeholder="Ingrese la nacionalidad"
                        />
                        {errors.nationality1 ? <p>{errors.nationality1}</p> :
                            errors.nationality2 ? <p>{errors.nationality2}</p> :
                                errors.nationality3 ? <p>{errors.nationality3}</p> : null}

                    </FormControl>
                    <FormControl ml={"70px"}>
                        <FormLabel ml={"55px"} color={"black"}>Imagen: </FormLabel>
                        <Input
                            type="text"
                            onChange={handleChange}
                            name="image"
                            borderRadius={"20px"}
                            placeholder="Ingrese la url de la imagen"
                        />
                        {errors.image1 ? <p>{errors.image1}</p> : null}
                    </FormControl>
                    <FormControl ml={"97px"}>
                        <FormLabel ml={"-20px"} color={"black"}>Fecha de nacimiento: </FormLabel>
                        <Input
                            type="date"
                            onChange={handleChange}
                            name="dob"
                            borderRadius={"20px"}
                            placeholder="Ingrese la fecha de nacimiento"
                        />
                        {errors.dob1 ? <p>{errors.dob1}</p> : null}

                    </FormControl>
                    <FormControl ml={"50px"}>
                        <FormLabel ml={"55px"} color={"black"} >Descripción: </FormLabel>
                        <Textarea
                            type="text"
                            onChange={handleChange}
                            name="description"
                            borderRadius={"30px"}
                            w={"200px"}
                            h={"100px"}
                            placeholder="Ingrese una descripción del driver"
                        />
                        {errors.description1 ? <p>{errors.description1}</p> :
                            errors.description2 ? <p>{errors.description2}</p> : null}
                    </FormControl>
                    <FormLabel ml={"120px"} color={"black"}>Teams: </FormLabel>
                    <Select
                        isMulti
                        options={teams}
                        onChange={handleChangeTeams}
                        value={teams.filter((team) => userData.teams.includes(team.value))}
                    />

                    <Button ml={"100px"} type="submit" disabled={submitDisabled}>Submit</Button>
                </form>
            </Box>
        
    )
}

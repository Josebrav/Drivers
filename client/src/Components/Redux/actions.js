import {
    ORDER,
    FILTER_API_OR_DB,
    GET_ALL_DRIVERS,
    FILTER_BY_NAME,
    FILTER_TEAM,
    GET_DRIVER_ID,
    
} from "./actions-types";
import axios from "axios";

const getAllDrivers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/drivers');
            return dispatch({
                type: GET_ALL_DRIVERS,
                payload: data
            })
        } catch (error) {
            throw Error(error.message);
        }
    }
}

const filterName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/drivers/name?name=${name}`);
            if (!data) {
                // Mostrar alerta si no se encontraron resultados
                alert("No existe");
            }
            return dispatch({
                type: FILTER_BY_NAME,
                payload: data
            })
        } catch (error) {
            throw Error(error.message);
        }
    }
}


const filterAPIorDB = (filterAPIorDB) => {
    return {
        type: FILTER_API_OR_DB, payload: filterAPIorDB
    }
};


const orderCards = (order) => {
    return {
        type: ORDER, payload: order
    }
};

const filterTeam = (selectedTeam) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/drivers');
            const driversTeam = data.filter((driv) => {
                if (driv.teams) {
                    return driv.teams.includes(selectedTeam)
                }
            });
            return dispatch({
                type: FILTER_TEAM,
                payload: driversTeam
            })
        } catch (error) {
            throw Error(error.message);
        }

    }
}

const getDriverId = (id) => {
    return async (dispatch) => {
      try {
        const {data} = await axios.get(`http://localhost:3001/drivers/${id}`);  
        return dispatch({ type: GET_DRIVER_ID, payload: data });
      } catch (error) {
        throw Error(error.message);
      }
    };
  };




export { filterAPIorDB, orderCards, getAllDrivers, filterName, filterTeam, getDriverId}
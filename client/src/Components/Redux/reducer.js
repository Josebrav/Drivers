import {
    ORDER,
    GET_ALL_DRIVERS,
    FILTER_API_OR_DB,
    FILTER_BY_NAME,
    FILTER_TEAM,
    GET_DRIVER_ID
} from "./actions-types";

const initalState = {
    allDrivers: [],
    allCharacters: [],
    driver: []
};

export default function reducer(state = initalState, action) {
    switch (action.type) {

        case GET_ALL_DRIVERS:
            return {
                ...state,
                allDrivers: action.payload,
                allCharacters: action.payload,
                
            };

        case FILTER_BY_NAME:
            return {
                ...state,
                allDrivers: action.payload
            }

        case ORDER:
            let orderCopy = [...state.allDrivers];
            if (action.payload === "A") {
                orderCopy.sort((a, b) => (a.name?.surname || a?.surname).localeCompare(b.name?.surname || b?.surname));
            } else if (action.payload === "D") {
                orderCopy.sort((a, b) => (b.name?.surname || b?.surname).localeCompare(a.name?.surname || a?.surname));
            } else if (action.payload === "Dob") {
                orderCopy.sort((a, b) => new Date(a.dob) - new Date(b.dob));
            }
            return {
                ...state,
                allDrivers: orderCopy
            };

        case FILTER_TEAM:
            return {
                ...state,
                allDrivers: action.payload

            }


        case FILTER_API_OR_DB:
            switch (action.payload) {
                case "ALL":
                    return {
                        ...state,
                        allDrivers: state.allCharacters,
                    };
                case "DB":
                    return {
                        ...state,
                        allDrivers: state.allCharacters.filter(
                            (driver) => driver.created
                        ),
                    };
                case "API":
                    return {
                        ...state,
                        allDrivers: state.allCharacters.filter(
                            (driver) => !driver.created
                        ),
                    };
            }

        case GET_DRIVER_ID:
            return {
                ...state,
                driver: action.payload,
            };

        // case RESET_FILTER:
        //     return {
        //         ...state,
        //         allDrivers:action.payload
        //     }
        default: return state
    }
}
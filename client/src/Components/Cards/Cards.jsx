import Card from '../Card/Card';
import style from '../Cards/Cards.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { format } from "date-fns"


export default function Cards() {

    const allDrivers = useSelector((state) => state.allDrivers);

    const [currentPage, setCurrentPage] = useState(1);
    const driversPerPage = 9;

    const lastIndex = currentPage * driversPerPage;
    const firstIndex = lastIndex - driversPerPage;


    return (
        <div>
            <div>
                <Pagination
                    driversPerPage={driversPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalDrivers={allDrivers.length}
                />
            </div>
            <div className={style.cardContainer}>


                {allDrivers.map(({ id, surname, name, image, teams, dob }) => {
                    return <Card
                        id={id && id}
                        key={id && id}
                        name={name?.surname && name?.surname || surname && surname}
                        image={image.url && image.url || image && image}
                        teams={teams && teams}
                        dob={dob && format(new Date(dob), "dd/MM/yyyy")}
                    />
                }).slice(firstIndex, lastIndex)
                }

            </div>
        </div>
    )

}
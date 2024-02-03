import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { format } from "date-fns"


export default function Cards() {

    const allDrivers = useSelector((state) => state.allDrivers);

    // const [currentPage, setCurrentPage] = useState(1);
    // const driversPerPage = 9;

    // const lastIndex = currentPage * driversPerPage;
    // const firstIndex = lastIndex - driversPerPage;

    
    // // 
    // const pagesToShow = 5; 


    // let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    // let endPage = startPage + pagesToShow - 1;
    // console.log(currentPage)

    // if(currentPage < 1){
    //     setCurrentPage(1)
    // }
    // console.log(currentPage > endPage)
    //     console.log(endPage)
    return (
        <div>
            {/* <div>
                <Pagination
                    driversPerPage={driversPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalDrivers={allDrivers.length}
                />
            </div> */}
            <div >


                {allDrivers.map(({ id, surname, name, image, teams, dob }) => {
                    return <Card
                        id={id && id}
                        key={id && id}
                        name={name?.surname && name?.surname || surname && surname}
                        image={image.url && image.url || image && image}
                        teams={teams && teams}
                        dob={dob && format(new Date(dob), "dd/MM/yyyy")}
                    />
                })
                // .slice(firstIndex, lastIndex)
                }

            </div>
        </div>
    )

}
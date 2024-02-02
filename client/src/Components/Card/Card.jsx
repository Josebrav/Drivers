import { Link } from 'react-router-dom';



export default function Card({ id, name, image, teams, dob }) {
    return (
        <div >
            <Link to={`/detail/${id}`} >
                <h3>{name}</h3>
            </Link>
            <img src={image} alt={name}  />
            <h3>Teams: {teams}</h3>
            <h3>Fecha de nacimiento: {dob}</h3>
        </div>
    );
}
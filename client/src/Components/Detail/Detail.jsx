import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from '../Detail/Detail.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getDriverId } from "../Redux/actions";


export default function Detail () {
   const { id } = useParams();
   const dispatch = useDispatch();
   const driver = useSelector((state) => state.driver);

   
   useEffect(() => {
     dispatch(getDriverId(id));
   }, [id]);
  
   
   return (
      <div className={styles.container}>
      <div className={styles.content}>
        <h1>Detalles del Driver</h1>
        <p>Nombre: {driver?.forename && driver?.forename} {driver?.surname && driver.surname} </p>
        {driver?.driverRef && <p>Apodo: {driver?.driverRef}</p>}
        {driver?.number && <p>Número: {driver?.number}</p>}
        <p>Nacionalidad: {driver?.nationality && driver?.nationality}</p>
        <p>Descripción: {driver?.description && driver?.description}</p>
        <p>Equipos: {driver?.teams && driver?.teams}</p>
      </div>
      {driver?.image && (
        <img
          src={driver?.image?.url || driver?.image}
          alt={`${driver?.forename} ${driver?.surname}`}
        />
      )}
    </div>
   );
 };
 
 
























// export default function Detail (){

//    const { id } = useParams();
//    const [driver, setDriver] = useState({});
//    useEffect(() => {
//       axios(`http://localhost:3001/drivers/${id}`).then(
//          ({ data }) => {
//             if (data.name) {
//                setDriver(data);
//             } else {
//                window.alert('No hay personajes con ese ID');
//             }
//          }
//       );
//       return setDriver({});
//    }, [id]);
// return(
//     <div className={styles.container}>
//       <div className={styles.content}>
//         <h1>Detalles del Driver</h1>
//         <p>Nombre: {driver?.name && driver?.name}</p>
//         <p>Apodo: {driver.driverRef && driver.driverRef}</p>
//         <p>Numero: {driver.number && driver.number}</p>
//         <p>Nacionalidad: {driver.nationality && driver.nationality}</p>
//         <p>Descripcion: {driver.description && driver.description}</p>
//       </div>
//       <img src={driver.image && driver.image} alt={driver?.name} />
//     </div>
// )
// }


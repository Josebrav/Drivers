import { Link } from 'react-router-dom';
import style from '../Landing/Landing.module.css'

export default function Landing() {
  return (
    <div className={style.button}>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  )
}
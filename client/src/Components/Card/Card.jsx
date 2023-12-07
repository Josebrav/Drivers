import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Card/Card.module.css';


export default function Card({ id, name, image, teams, dob }) {
    return (
        <div className={styles.card}>
            <Link to={`/detail/${id}`} className={styles.link}>
                <h3>{name}</h3>
            </Link>
            <img src={image} alt={name} className={styles.image} />
            <h3>Teams: {teams}</h3>
            <h3>Fecha de nacimiento: {dob}</h3>
        </div>
    );
}
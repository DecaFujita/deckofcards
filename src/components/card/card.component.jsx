import React from 'react';

import './card.styles.css';

const Card = props => {
 return(
    <img className='card' src={props.image} alt={props.name} />     
 )
}

export default Card;
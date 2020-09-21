import React from 'react';
import Card from './Card.jsx';

const GridCard = props => {
  return (
    <Card {...props} draggable={false} isButton={true} isTagCloud={true}/>
  )
}

export default GridCard;

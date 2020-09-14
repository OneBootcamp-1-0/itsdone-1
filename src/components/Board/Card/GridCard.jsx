import React from 'react';
import Card from './Card.jsx';

const GridCard = props => {
  return (
    <Card {...props} isButton={true} />
  )
}

export default GridCard;

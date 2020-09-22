import React from 'react';
import Card from './Card.jsx';

const CanbanCard = props => {
  return (
    <Card {...props} draggable={true} isButton={false} />
  )
};

export default CanbanCard;

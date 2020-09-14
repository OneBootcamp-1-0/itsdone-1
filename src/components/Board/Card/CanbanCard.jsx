import React from 'react';
import Card from './Card.jsx';

const CanbanCard = props => {
  return (
    <Card {...props} isButton={false} />
  )
}

export default CanbanCard;

import React from 'react';
import Card from './Card.jsx';

const CanbanCard = props => {

  return (
    <Card draggable={true} isButton={false} {...props}/>
  )
};

export default CanbanCard;

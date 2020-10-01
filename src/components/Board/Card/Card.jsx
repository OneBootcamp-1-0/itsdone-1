import React from 'react';
import { useDispatch } from 'react-redux';
import css from './Card.css';
import TagCloud from './TagCloud.jsx'
import { operations } from '../../../redux/tasksReducer.js';
import deleteSVG from '../../../assets/delete.svg';

const Card = props => {
  const { isButton, date, title, text, isDone, id, setEditCard, tags, draggable } = props;
  const deleteImgRef = React.createRef();
  const dispatch = useDispatch();

  const butifiedDate = date ? new Date(date).toDateString() : '';

  const onBtnClick = () => {
    dispatch(operations.updateTask({ isDone: !isDone, id: id }))
  };

  const onCardClick = e => {
    if (e.target.closest('div[data-card=true]') && !e.target.closest('button') && !e.target.closest('img')) {
      setEditCard({
        id: id,
        isEdit: true
      });
    }
  };

  const onDeleteCardClick = () => {
    dispatch(operations.deleteTask(id));
  }

  const onDragStart = e => {
    e.persist();
    e.dataTransfer.setData('card_id', e.target.id);
  };

  return <div onMouseEnter={() => deleteImgRef.current.style.display = 'block'} onMouseLeave={() => deleteImgRef.current.style.display = 'none'} onDragStart={draggable ? onDragStart : null} draggable={draggable} data-card={true} id={id} onClick={onCardClick} className={`${css.card} ${isButton ? '' : css.card_canban} card`}>
    <img style={{display: 'none'}} ref={deleteImgRef} onClick={onDeleteCardClick} className={css.card__delete} width="15px" src={deleteSVG} alt={`delete task: ${title}`} />
    <p className={`${css.card__date} ${isDone ? css.card__done : ''}`}>{butifiedDate}</p>
    <h2 className={`${css.card__title} ${isDone ? css.card__done : ''}`}>{title}</h2>
    <div className={css.card__note_wrapper}>
      <p className={`${css.card__note} ${isDone ? css.card__done : ''}`}>{text}</p>
    </div>
    <div className={css.btn__wrapper}>
      <div className={css.card__note_shadow}></div>
      <TagCloud tags={tags} />
      {isButton ? <button className={css.card__btn} type='button' onClick={onBtnClick}>{isDone ? 'NOTDONE!' : 'DONE!'}</button> : null}
    </div>
  </div>
};

export default Card;

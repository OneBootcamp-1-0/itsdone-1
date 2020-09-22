import React from 'react';
import css from './TagCloud.css';

const TagCloud = props => {

  const {tags, id} = props;

  return (
    <ul className={css.tag_cloud}>
        <li className={css.tag_cloud__item}>{tags[id]}</li>
        <li className={css.tag_cloud__item}>{tags[id]}</li>
        <li className={css.tag_cloud__item}>{tags[id]}</li>
        <li className={css.tag_cloud__item}>{tags[id]}</li>
        <li className={css.tag_cloud__item}>{tags[id]}</li>
    </ul>
  )
};

export default TagCloud;

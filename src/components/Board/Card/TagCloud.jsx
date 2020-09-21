import React from 'react';
import css from './TagCloud.css';

const TagCloud = () => {

  return (
    <ul className={css.tag_cloud}>
        <li className={css.tag_cloud__item}>#important</li>
        <li className={css.tag_cloud__item}>#bug</li>
        <li className={css.tag_cloud__item}>#label</li>
        <li className={css.tag_cloud__item}>#wontfix</li>
        <li className={css.tag_cloud__item}>#2-points</li>
    </ul>
  )
};

export default TagCloud;

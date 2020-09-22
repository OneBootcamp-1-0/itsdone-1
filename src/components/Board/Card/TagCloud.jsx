import React from 'react';
import css from './TagCloud.css';

const TagCloud = props => {

  const {tags} = props;

  const tagItems = tags.map(tag => <li className={css.tag_cloud__item}>{tag}</li>)

  return (
    <ul className={css.tag_cloud}>
      {tagItems}
    </ul>
  )
};

export default TagCloud;

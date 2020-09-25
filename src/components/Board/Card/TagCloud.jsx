import React from 'react';
import css from './TagCloud.css';

const TagCloud = props => {

  const {tags} = props;

  const getColor = () => {
    const r = Math.floor(Math.random() * (256));
    const g = Math.floor(Math.random() * (256));
    const b = Math.floor(Math.random() * (256));
    const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
  };

  const tagItems = tags.map((tag,i) => <li className={css.tag_cloud__item} style={{color : getColor()}} key={i}>{tag[0] === '#' ? tag : `#${tag}` }</li>)

  return (
    <ul className={css.tag_cloud}>
      {tagItems}
    </ul>
  )
};

export default TagCloud;

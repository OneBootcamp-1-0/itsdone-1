import React from 'react';
import css from './TagCloud.css';

const TagCloud = props => {

  const {tags, onCardEdit, id, allTags} = props;

  const getColor = () => {
    const r = Math.floor(Math.random() * (256));
    const g = Math.floor(Math.random() * (256));
    const b = Math.floor(Math.random() * (256));
    const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
  };
  console.log(allTags)
  const chooseColor = (tag) => {
    let newColor;
    if (allTags.get(tag)) {
      if (!tags[tag]) {
        onCardEdit(id, {tags: {...tags, [tag]: allTags.get(tag)}})
      }
      return allTags.get(tag);
    }

    newColor = getColor();

    onCardEdit(id, {tags: {...tags, [tag]: newColor}})
    return newColor;
  };

  const tagItems = Object.keys(tags).map((tag,i) => <li className={css.tag_cloud__item} style={{color : chooseColor(tag)}} key={i}>{tag[0] === '#' ? tag : `#${tag}` }</li>)

  return (
    <ul className={css.tag_cloud}>
      {tagItems}
    </ul>
  )
};

export default TagCloud;

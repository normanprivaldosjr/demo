import React from 'react';

const List = ({
  attributes,
  setAttributes,
  isEditable,
  RichText,
}) => {
  const { type, content } = attributes;
  const ListTag = type;

  return (
    <div className={`list-block component ${isEditable ? 'block-editor' : ''}`}>
      <div className="component-wrapper">
        {
          isEditable ? (
            <RichText
              multiline="li"
              tagName={type}
              onChange={content => setAttributes({ content })}
              value={content}
              placeholder="Write list"
            />
          ) : (
            <ListTag dangerouslySetInnerHTML={{ __html: content }} />
          )
        }
      </div>
    </div>
  );
};

export default List;

import React from 'react';

const Paragraph = ({
  attributes,
  setAttributes,
  RichText,
  isEditable,
}) => {
  const { content } = attributes;

  return (
    <div className={`paragraph-block component ${isEditable ? 'block-editor' : ''}`}>
      <div className="component-wrapper">
        {
          isEditable ? (
            <RichText
              tagName="p"
              placeholder="Add content"
              allowedFormats={['core/bold', 'core/italic', 'core/link']}
              value={content}
              onChange={content => setAttributes({ content })}
            />
          ) : (
            <p dangerouslySetInnerHTML={{ __html: content }} />
          )
        }
      </div>
    </div>
  );
};

export default Paragraph;

import React from 'react';

const Heading = ({
  className,
  attributes,
  setAttributes,
  RichText,
  isEditable,
}) => {
  const { level, content } = attributes;
  const HeadingTag = `h${level}`;

  return (
    <div className={`component heading-block ${isEditable ? 'block-editor' : ''}`}>
      <div className="component-wrapper">
        {
          isEditable ? (
            <RichText
              tagName={`h${level}`}
              value={content}
              allowedFormats={[]}
              placeholder="Add Heading"
              onChange={content => setAttributes({ content })}
            />
          ) : (
            <HeadingTag dangerouslySetInnerHTML={{ __html: content }} />
          )
        }
      </div>
    </div>
  );
};

export default Heading;

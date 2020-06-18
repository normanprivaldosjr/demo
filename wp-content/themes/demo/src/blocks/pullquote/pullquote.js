import React from 'react';

const Icon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/>
    </svg>
  );
};

const PullQuote = ({
  attributes,
  setAttributes,
  RichText,
  isEditable,
}) => {
  const { content, author } = attributes;

  return (
    <div className={`pull-quote component ${isEditable ? 'block-editor' : ''}`}>
      <div className="component-wrapper">
        <div className="main">
          <Icon />
          {
            isEditable ? (
              <RichText
                tagName="p"
                allowedFormats={['core/bold', 'core/italic']}
                value={content}
                placeholder="Enter Content"
                onChange={content => setAttributes({ content })}
              />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: content }} />
            )
          }
        </div>
        <div className="author">
          <div className="line" />
          {
            isEditable ? (
              <RichText
                tagName="div"
                className="text"
                allowedFormats={[]}
                value={author}
                placeholder="Enter Author"
                onChange={author => setAttributes({ author })}
              />
            ) : (
              <div
                className="text"
                dangerouslySetInnerHTML={{ __html: author }}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default PullQuote;

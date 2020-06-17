import React from 'react';
import Picture from '../../reusable-components/picture';

const Image = ({
  attributes,
  setAttributes,
  RichText,
  isEditable,
}) => {
  const { image } = attributes;

  return (
    <div className={`image-embed component ${isEditable ? 'block-editor' : ''}`}>
      <div className="component-wrapper">
        <div className={`image ${!image.src ? 'is-empty' : ''} image--${image.aspectRatio}`}>
          <div className="image-wrapper">
            <Picture image={image} />
          </div>
        </div>
        {
          isEditable ? (
            <div className="caption">
              <RichText
                tagName="p"
                value={image.caption}
                allowedFormats={['core/bold', 'core/italic']}
                placeholder="Add Caption"
                onChange={caption => {
                  const _image = {...image}
                  _image.caption = caption;
                  setAttributes({ image: _image });
                }}
              />
            </div>
          ) : image.caption ? (
            <div className="caption">
              <p dangerouslySetInnerHTML={{ __html: image.caption }} />
            </div>
          ) : null
        }
      </div>
    </div>
  )
};

export default Image;

import React from 'react';
import Picture from '../../reusable-components/picture';
import { months } from '../../assets/js/variables';

const parseDate = date => {
  if (date) {
    const newDate = new Date(date);
    return `${months[newDate.getMonth()]} ${newDate.getDate().toString().padStart(2, '0')}, ${newDate.getFullYear()} ${newDate.getHours().toString().padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}`
  }

  return '';
};

const Video = ({ video }) => {
  return video.src ? (
    <video playsInline muted loop autoPlay>
      <source type={video.type} src={video.src} />
    </video>
  ) : null;
};

const HeroBlog = ({ attributes, setAttributes, RichText, isEditable }) => {
  const { image, video, title, author, date } = attributes;

  return (
    <div className={`component hero-blog ${isEditable ? 'block-editor' : ''}`}>
      <div className="background">
        <Picture image={image} />
        <Video video={video} />
      </div>
      <div className="component-wrapper">
        <section>
          {
            isEditable ? (
              <RichText
                tagName="h1"
                className="title"
                value={title}
                onChange={title => setAttributes({ title })}
                allowedFormats={[]}
                placeholder="Add title"
              />
            ) : (
              <h1 
                className="title"
                dangerouslySetInnerHTML={{ __html: title }} 
              />
            )
          }
        </section>
        <section>
          <div>{ isEditable ? 'Author Name' : `${author.firstName} ${author.lastName}` }</div>
          <div>{ isEditable ? 'Publication Date' : `${parseDate(date)}` }</div>
        </section>
      </div>
    </div>
  )
};

export default HeroBlog;

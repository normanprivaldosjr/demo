import React from 'react';

const Video = ({
  attributes,
  setAttributes,
  RichText,
  videoRef,
  isEditable,
}) => {
  const { video } = attributes;
  const { loop, autoPlay, playsInline, muted, controls } = video;
  
  return (
    <div className={`video-embed component ${isEditable ? 'block-editor' : ''}`}>
      <div className="component-wrapper">
        <div className={`video ${!video.id ? 'is-empty' : ''}`}>
          {
            video.src ? (
              <video
                ref={videoRef}
                loop={loop}
                autoPlay={autoPlay}
                playsInline={playsInline}
                muted={muted}
                controls={controls}
              >
                <source src={video.src} type={video.type} />
                Your browser does not support video tag
              </video>
            ) : (
              <div className="placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.266 7l12.734-2.625-.008-.042-1.008-4.333-21.169 4.196c-1.054.209-1.815 1.134-1.815 2.207v14.597c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3v-14h-12.734zm8.844-5.243l2.396 1.604-2.994.595-2.398-1.605 2.996-.594zm-5.898 1.169l2.4 1.606-2.994.595-2.401-1.607 2.995-.594zm-5.904 1.171l2.403 1.608-2.993.595-2.406-1.61 2.996-.593zm-2.555 5.903l2.039-2h3.054l-2.039 2h-3.054zm4.247 10v-7l6 3.414-6 3.586zm4.827-10h-3.054l2.039-2h3.054l-2.039 2zm6.012 0h-3.054l2.039-2h3.054l-2.039 2z"/>
                </svg>
              </div>
            )
          }
        </div>
        {
          isEditable ? (
            <div className="caption">
              <RichText
                tagName="p"
                value={video.caption}
                allowedFormats={['core/bold', 'core/italic']}
                placeholder="Add Caption"
                onChange={caption => {
                  const _video = {...video};
                  _video.caption = caption;
                  setAttributes({ video: _video });
                }}
              />
            </div>
          ) : video.caption ? (
            <div className="caption">
              <p dangerouslySetInnerHTML={{ __html: video.caption }} />
            </div>
          ) : null
        }
      </div>
    </div>
  )
};

export default Video;

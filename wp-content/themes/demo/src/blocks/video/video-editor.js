import Video from './video';
import { createIcon } from '../../assets/js/functions';

const {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  RichText,
} = wp.blockEditor;
const { PanelBody, Button, CheckboxControl } = wp.components;
const { useEffect, useRef, useState } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;

const SideControls = ({ attributes, setAttributes, videoSrc }) => {
  const { video } = attributes;

  return (
    <InspectorControls>
      <PanelBody title="Video Attributes">
        <MediaUploadCheck>
          <h4>Video File <span className="required">*</span></h4>
          <MediaUpload
            title="Video File"
            allowedTypes={['video']}
            value={video.id}
            onSelect={({ id }) => {
              const _video = {...video};
              _video.id = id;
              setAttributes({ video: _video });
            }}
            render={({ open }) => {
              return (
                <>
                  {
                    !!video.id && videoSrc && (
                      <div className="video-title">
                        { createIcon('M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z') }
                        { videoSrc.title.raw }
                      </div>
                    )
                  }
                  <Button
                    className={`panel-button ${video.id ? 'components-button is-button is-default is-large' : 'components-button editor-post-featured-image__toggle'}`}
                    onClick={open}
                  >
                    { !video.id && 'Set Video' }
                    { !!video.id && videoSrc && 'Replace Video' }
                  </Button>
                  {
                    !!video.id && videoSrc && (
                      <Button
                        className="panel-button components-button is-link is-destructive"
                        onClick={() => {
                          setAttributes({
                            video: {
                              id: null,
                              src: null,
                              type: null,
                              loop: false,
                              autoPlay: false,
                              playsInline: true,
                              muted: false,
                              controls: true,
                              caption: null,
                            }
                          });
                        }}
                      >
                        Remove Video
                      </Button>
                    )
                  }
                </>
              )
            }}
          />
        </MediaUploadCheck>
        <br />
        <h4>Video Attributes</h4>
        <br />
        <div className="checkbox-group">
          <CheckboxControl
            label="Loop Video"
            checked={video.loop}
            onChange={() => {
              const _video = {...video};
              _video.loop = !video.loop;
              setAttributes({ video: _video });
            }}
          />
          <CheckboxControl
            label="Auto Play"
            checked={video.autoPlay}
            onChange={() => {
              const _video = {...video};
              _video.autoPlay = !video.autoPlay;
              setAttributes({ video: _video });
            }}
          />
          <CheckboxControl
            label="Plays Inline"
            checked={video.playsInline}
            onChange={() => {
              const _video = {...video};
              _video.playsInline = !video.playsInline;
              setAttributes({ video: _video });
            }}
          />
          <CheckboxControl
            label="Muted"
            checked={video.muted}
            onChange={() => {
              const _video = {...video};
              _video.muted = !video.muted;
              setAttributes({ video: _video });
            }}
          />
          <CheckboxControl
            label="Show Video Controls"
            checked={video.controls}
            onChange={() => {
              const _video = {...video};
              _video.controls = !video.controls;
              setAttributes({ video: _video });
            }}
          />
        </div>
      </PanelBody>
    </InspectorControls>
  );
};

const videoBlockEditor = {
  title: 'Video',
  description: 'Embed a video from your media library or upload a new one.',
  icon: createIcon('M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z'),
  category: 'common',
  keywords: ['Video', 'Embed', 'Block'],
  attributes: {
    video: {
      type: 'object',
      default: {
        id: null,
        src: null,
        type: null,
        loop: false,
        autoPlay: false,
        playsInline: true,
        muted: false,
        controls: true,
        caption: null,
      },
    },
  },
  edit: compose(withSelect((select, { attributes }) => {
    const { getMedia } = select('core');
    const { id } = attributes.video;

    return {
      videoSrc: id ? getMedia(id) : null,
    };
  }))(props => {
    const videoRef = useRef();
    const { attributes, setAttributes, videoSrc } = props;
    const { id, autoPlay } = attributes.video;

    useEffect(() => {
      if (videoSrc) {
        const _video = {...attributes.video};
        _video.src = videoSrc.source_url;
        _video.type = videoSrc.mime_type;

        setAttributes({ video: _video });
      }
    }, [videoSrc]);

    useEffect(() => {
      if (id) {
        if (autoPlay) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    }, [autoPlay]);

    return (
      <>
        <SideControls {...props} />
        <Video 
          {...props} 
          RichText={RichText} 
          videoRef={videoRef}
          isEditable 
        />
      </>
    )
  }),
};

export default videoBlockEditor;

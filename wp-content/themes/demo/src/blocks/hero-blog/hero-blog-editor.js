import { createIcon, mapResponsiveImage } from '../../assets/js/functions';
import HeroBlog from './hero-blog';

const { 
  InspectorControls, 
  MediaUpload, 
  MediaUploadCheck, 
  RichText, 
} = wp.blockEditor;
const { PanelBody, Button } = wp.components;
const { compose } = wp.compose;
const { withSelect, dispatch } = wp.data;
const { useEffect } = wp.element;

const SideControls = props => (
  <InspectorControls>
    <PanelBody title="Hero Attributes">
      <MediaUploadCheck>
        <h4>Background Image <span className="required">*</span></h4>
        <MediaUpload
          title="Image File"
          allowedTypes={['image']}
          value={props.attributes.image.id}
          onSelect={({ id }) => {
            const newImage = {...props.attributes.image};
            newImage.id = id;
            props.setAttributes({ image: newImage });
          }}
          render={({ open }) => (
            <>
              {
                !!props.attributes.image.id && props.imageSrc && (
                  <div className="hero__image-preview">
                    <img src={props.imageSrc.source_url} />
                  </div>
                )
              }
              <Button
                className={`panel-button ${props.attributes.image.id ? 'components-button is-button is-default is-large' : 'components-button editor-post-featured-image__toggle'}`}
                onClick={open}
              >
                { !props.attributes.image.id && 'Set Image' }
                { !!props.attributes.image.id && props.imageSrc && 'Replace Image' }
              </Button>

              {
                !!props.attributes.image.id && props.imageSrc && (
                  <Button
                    className="panel-button components-button is-link is-destructive"
                    onClick={() => {
                      props.setAttributes({
                        image: {
                          id: null,
                          src: null,
                          alt: null,
                          srcSet: [],
                        }
                      });
                    }}
                  >
                    Remove Image
                  </Button>
                )
              }
            </>
          )}
        />
      </MediaUploadCheck>

      <br />

      <MediaUploadCheck>
        <h4>Background Video</h4>
        <MediaUpload
          title="Video File"
          allowedTypes={['video']}
          value={props.attributes.video.id}
          onSelect={({ id }) => {
            const newVideo = {...props.attributes.video};
            newVideo.id = id;
            props.setAttributes({ video: newVideo });
          }}
          render={({ open }) => (
            <>
              {
                !!props.attributes.video.id && props.videoSrc && (
                  <div className="video-title">
                    { createIcon('M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z') }
                    { props.videoSrc.title.raw }
                  </div>
                )
              }

              <Button
                className={`panel-button ${props.attributes.video.id ? 'components-button is-button is-default is-large' : 'components-button editor-post-featured-image__toggle'}`}
                onClick={open}
              >
                { !props.attributes.video.id && 'Set Video' }
                { !!props.attributes.video.id && props.videoSrc && 'Replace Video' }
              </Button>

              {
                !!props.attributes.video.id && props.videoSrc && (
                  <Button
                    className="panel-button components-button is-link is-destructive"
                    onClick={() => {
                      props.setAttributes({
                        video: {
                          id: null,
                          src: null,
                          type: null,
                        }
                      });
                    }}
                  >
                    Remove Video
                  </Button>
                )
              }
            </>
          )}
        />
      </MediaUploadCheck>
    </PanelBody>
  </InspectorControls>
);

const heroBlogBlockEditor = {
  title: 'Hero Blog',
  description: 'Add an image or video with text overlay',
  icon: createIcon('M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z'),
  category: 'common',
  keywords: ['Image', 'Video', 'Hero', 'Block'],
  attributes: {
    image: {
      type: 'object',
      default: {
        id: null,
        src: null,
        alt: null,
        srcSet: [],
      },
    },
    video: {
      type: 'object',
      default: {
        id: null,
        src: null,
        type: null,
      },
    },
    title: {
      type: 'string',
    },
  },
  edit: compose(withSelect((select, { attributes }) => {
    const { getMedia } = select('core');
    const { image, video } = attributes;
    const { id: imageID } = image;
    const { id: videoID } = video;

    return {
      imageSrc: imageID ? getMedia(imageID) : null,
      videoSrc: videoID ? getMedia(videoID) : null,
    };
  }))(props => {
    const { imageSrc, videoSrc, attributes } = props;
    const { image, video, title } = attributes;

    useEffect(() => {
      if (imageSrc) {
        const newImage = {...image};
        newImage.src = imageSrc.source_url;
        newImage.alt = imageSrc.alt_text;
        newImage.srcSet = mapResponsiveImage(imageSrc.media_details.sizes);

        props.setAttributes({ image: newImage });
      }

      if (videoSrc) {
        const newVideo = {...video};
        newVideo.src = videoSrc.source_url;
        newVideo.type = videoSrc.mime_type;

        props.setAttributes({ video: newVideo });
      }

      dispatch('core/editor').editPost({ title });
    }, [imageSrc, videoSrc, title]);

    return (
      <>
        <SideControls {...props} />
        <HeroBlog {...props} RichText={RichText} isEditable />
      </>
    )
  })
};

export default heroBlogBlockEditor;

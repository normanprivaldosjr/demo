import Image from './image';
import { createIcon, mapResponsiveImage } from '../../assets/js/functions';
import { aspectRatioOptions } from '../../assets/js/variables';

const { 
  InspectorControls, 
  MediaUpload, 
  MediaUploadCheck, 
  RichText, 
} = wp.blockEditor;
const { PanelBody, Button, SelectControl } = wp.components;
const { useEffect } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;

const SideControls = props => (
  <InspectorControls>
    <PanelBody title="Image Attributes">
      <MediaUploadCheck>
        <h4>Image <span className="required">*</span></h4>
        <br />
        <MediaUpload
          title="Image File"
          allowedTypes={['image']}
          value={props.attributes.image.id}
          onSelect={({ id }) => {
            const _image = {...props.attributes.image};
            _image.id = id;
            props.setAttributes({ image: _image });
          }}
          render={({ open }) => {
            if (!props.attributes.image.id) {
              open();
            }

            return (
              <>
                {
                  !!props.attributes.image.id && props.imageSrc && (
                    <div className="image-embed__image-preview">
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
                            caption: null,
                            aspectRatio: '4x3',
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
            )
          }}
        />
      </MediaUploadCheck>

      <br />

      <h4>Aspect Ratio <span className="required">*</span></h4>
      <br />
      <SelectControl
        value={props.attributes.image.aspectRatio}
        options={aspectRatioOptions}
        onChange={aspectRatio => {
          const _image = {...props.attributes.image};
          _image.aspectRatio = aspectRatio;
          props.setAttributes({ image: _image });
        }}
      />
    </PanelBody>
  </InspectorControls>
);

const imageBlockEditor = {
  title: 'Image',
  description: 'Insert an image to make a visual statement',
  icon: createIcon('M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z'),
  category: 'common',
  keywords: ['Image', 'Embed', 'Block'],
  attributes: {
    image: {
      type: 'object',
      default: {
        id: null,
        src: null,
        alt: null,
        caption: null,
        aspectRatio: '4x3',
        srcSet: [],
      },
    },
  },
  edit: compose(withSelect((select, { attributes }) => {
    const { getMedia } = select('core');
    const { id } = attributes.image;

    return {
      imageSrc: id ? getMedia(id) : null,
    };
  }))(props => {
    const { imageSrc, setAttributes } = props;
    const { image } = props.attributes;

    useEffect(() => {
      if (imageSrc) {
        const newImage = {...image};
        newImage.src = imageSrc.source_url;
        newImage.alt = imageSrc.alt_text;
        newImage.srcSet = mapResponsiveImage(imageSrc.media_details.sizes);

        setAttributes({ image: newImage });
      }
    }, [imageSrc]);

    return (
      <>
        <SideControls {...props} />
        <Image {...props} RichText={RichText} isEditable />
      </>
    )
  }),
};

export default imageBlockEditor;

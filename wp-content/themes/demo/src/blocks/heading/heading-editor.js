import Heading from './heading';
import { createIcon } from '../../assets/js/functions';

const { InspectorControls, RichText } = wp.blockEditor;
const { PanelBody, ButtonGroup, Button } = wp.components;

const SideControls = ({ attributes, setAttributes }) => {
  const { level } = attributes;

  return (
    <InspectorControls>
      <PanelBody title="Heading Attributes">
        <h4>Heading Level</h4>
        <br />
        <ButtonGroup>
          <Button onClick={() => setAttributes({ level: 2 })} isPrimary={level === 2} className="components-button is-button is-default is-large">H2</Button>
          <Button onClick={() => setAttributes({ level: 3 })} isPrimary={level === 3} className="components-button is-button is-default is-large">H3</Button>
          <Button onClick={() => setAttributes({ level: 4 })} isPrimary={level === 4} className="components-button is-button is-default is-large">H4</Button>
          <Button onClick={() => setAttributes({ level: 5 })} isPrimary={level === 5} className="components-button is-button is-default is-large">H5</Button>
          <Button onClick={() => setAttributes({ level: 6 })} isPrimary={level === 6} className="components-button is-button is-default is-large">H6</Button>
        </ButtonGroup>
      </PanelBody>
    </InspectorControls>
  );
};

const headingBlockEditor = {
  title: 'Heading',
  description: 'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.',
  icon: createIcon('M3,4H5V10H9V4H11V18H9V12H5V18H3V4M13,8H15.31L15.63,5H17.63L17.31,8H19.31L19.63,5H21.63L21.31,8H23V10H21.1L20.9,12H23V14H20.69L20.37,17H18.37L18.69,14H16.69L16.37,17H14.37L14.69,14H13V12H14.9L15.1,10H13V8M17.1,10L16.9,12H18.9L19.1,10H17.1Z'),
  category: 'common',
  keywords: ['Heading', 'Text', 'Block'],
  attributes: {
    content: {
      type: 'string',
    },
    level: {
      type: 'number',
      default: 2,
    },
  },
  edit: props => {
    return (
      <>
        <SideControls {...props} />
        <Heading {...props} RichText={RichText} isEditable />
      </>
    )
  },
};

export default headingBlockEditor;

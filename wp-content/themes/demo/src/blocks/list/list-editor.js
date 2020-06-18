import List from './list';
import { createIcon } from '../../assets/js/functions';

const { InspectorControls, RichText } = wp.blockEditor;
const { PanelBody, ButtonGroup, Button } = wp.components;

const SideControls = ({ attributes, setAttributes }) => {
  const { type } = attributes;

  return (
    <InspectorControls>
      <PanelBody title="List Attributes">
        <h4>List Type</h4>
        <br />
        <ButtonGroup>
          <Button onClick={() => setAttributes({ type: 'ul' })} isPrimary={type === 'ul'} className="components-button is-button is-default is-large">BULLET</Button>
          <Button onClick={() => setAttributes({ type: 'ol' })} isPrimary={type === 'ol'} className="components-button is-button is-default is-large">NUMBERED</Button>
        </ButtonGroup>
      </PanelBody>
    </InspectorControls>
  )
};

const listBlockEditor = {
  title: 'List',
  description: 'Create a bulleted or numbered list.',
  icon: createIcon('M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z'),
  category: 'common',
  keywords: ['List', 'Bullet', 'Numbered', 'Block'],
  attributes: {
    type: {
      type: 'string',
      default: 'ul',
    },
    content: {
      type: 'string',
    },
  },
  edit: props => {
    return (
      <>
        <SideControls {...props} />
        <List {...props} RichText={RichText} isEditable />
      </>
    )
  }
};

export default listBlockEditor;

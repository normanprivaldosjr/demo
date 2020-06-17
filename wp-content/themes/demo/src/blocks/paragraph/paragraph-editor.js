import Paragraph from './paragraph';
import { createIcon } from '../../assets/js/functions';

const { RichText } = wp.blockEditor;

const paragraphBlockEditor = {
  title: 'Paragraph',
  description: 'Start with the building block of all narrative.',
  icon: createIcon('M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z'),
  category: 'common',
  keywords: ['Paragraph', 'Text', 'Content', 'Block'],
  attributes: {
    content: {
      type: 'string',
    },
  },
  edit: props => (
    <Paragraph 
      {...props}
      RichText={RichText} 
      isEditable
    />
  ),
};

export default paragraphBlockEditor;

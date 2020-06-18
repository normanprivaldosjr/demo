import PullQuote from './pullquote';
import { createIcon } from '../../assets/js/functions';

const { RichText } = wp.blockEditor;

const pullQuoteEditor = {
  title: 'Pull Quote',
  description: 'Give quoted text visual emphasis. "In quoting others, we cite ourselves." — Julio Cortázar',
  icon: createIcon('M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z'),
  category: 'common',
  keywords: ['Pull', 'Quote', 'Text', 'Block'],
  attributes: {
    content: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
  },
  edit: props => <PullQuote {...props} RichText={RichText} isEditable />
};

export default pullQuoteEditor;

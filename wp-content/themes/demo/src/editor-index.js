import heroBlogBlockEditor from './blocks/hero-blog/hero-blog-editor';
import headingBlockEditor from './blocks/heading/heading-editor';
import paragraphBlockEditor from './blocks/paragraph/paragraph-editor';
import imageBlockEditor from './blocks/image/image-editor';

const { registerBlockType } = wp.blocks;

registerBlockType('demo/hero-blog', heroBlogBlockEditor);
registerBlockType('demo/heading', headingBlockEditor);
registerBlockType('demo/paragraph', paragraphBlockEditor);
registerBlockType('demo/image', imageBlockEditor);
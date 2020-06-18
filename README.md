# WordPress demo site

## Custom Blocks

All custom blocks can be found inside `wp-content/themes/demo/src/blocks` each block has its own folder containing a SCSS file, an editor script, and the React component itself. The idea behind this approach is to make use of the React component inside the CMS and on the frontend side itself. Reusing the same component on both aims to reduce the necessary UI update and shorten the development period.
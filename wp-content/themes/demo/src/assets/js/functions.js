import { months } from './variables';

export const parseDate = rawDate => {
  const date = new Date(rawDate);
  return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const getURLVars = (url) => {
  const vars = {};
  const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, val) => {
    vars[key] = val;
  });
  return vars;
};

export const getURLParam = (url, param, defVal) => {
  return window.location.href.indexOf(param) > -1
    ? getURLVars(url)[param]
    : defVal;
};


/**
 * Create an SVG element in DOM
 * 
 * @param {string} d 
 * 
 */
export const createIcon = d => {
  const { createElement: el } = wp.element;
  return el('svg', { width: 24, height: 24 }, el('path', { d }));
};

/**
 * Generates an array of responsive images
 * 
 * @param {object} sizes 
 * 
 */
export const mapResponsiveImage = sizes => {
  const srcSet = [];

  Object.keys(sizes).forEach(key => {
    switch (key) {
      case 'mobile' : {
        srcSet.push({
          src: sizes[key].source_url,
          type: sizes[key].mime_type,
          media: 'all and (max-width: 767px)',
        });
        break;
      }
      case 'tablet': {
        srcSet.push({
          src: sizes[key].source_url,
          type: sizes[key].mime_type,
          media: '(min-width: 768px) and (max-width: 1279px)',
        });
        break;
      }
      case 'desktop': {
        srcSet.push({
          src: sizes[key].source_url,
          type: sizes[key].mime_type,
          media: 'all and (min-width: 1280px)',
        });
        break;
      }
      default: break;
    }
  });

  return srcSet;
};

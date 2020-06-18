import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import useMetaTags from 'react-metatags-hook';
import { useQuery } from '@apollo/react-hooks';

import HeroBlog from '../../blocks/hero-blog/hero-blog';
import Heading from '../../blocks/heading/heading';
import Paragraph from '../../blocks/paragraph/paragraph';
import Image from '../../blocks/image/image';
import Video from '../../blocks/video/video';

const MAIN_QUERY = gql`
  query blog($uri: String, $blogId: Int) {
    blogBy(uri: $uri, blogId: $blogId) {
      id
      date
      title
      author {
        firstName
        lastName
      }
      blocks {
        ... on DemoHeroBlogBlock {
          parentId
          attributes {
            className
            image
            title
            video
          }
        }
        ... on DemoHeadingBlock {
          parentId
          attributes {
            className
            content
            level
          }
        }
        ... on DemoParagraphBlock {
          parentId
          attributes {
            className
            content
          }
        }
        ... on DemoImageBlock {
          parentId
          attributes {
            className
            image
          }
        }
        ... on DemoVideoBlock {
          parentId
          attributes {
            className
            video
          }
        }
      }
    }
  }
`;

const initialMeta = {
  title: 'Demo',
  description: '',
  charset: 'utf8',
  lang: 'en',
};

const renderContent = data => {
  return data.blogBy.blocks.map(({
    __typename: typeName,
    attributes,
  }, index) => {
    switch (typeName) {
      case 'DemoHeadingBlock': {
        return <Heading key={index} attributes={attributes} />
      }
      case 'DemoParagraphBlock': {
        return <Paragraph key={index} attributes={attributes} />
      }
      case 'DemoImageBlock': {
        const newAttributes = {...attributes};
        newAttributes.image = JSON.parse(newAttributes.image);
        return <Image key={index} attributes={newAttributes} />
      }
      case 'DemoVideoBlock': {
        const newAttributes = {...attributes};
        newAttributes.video = JSON.parse(newAttributes.video);
        return <Video key={index} attributes={newAttributes} />
      }
    }
  })
}

const Blog = ({ match, blogId }) => {
  const { slug: uri } = match ? match.params : { slug: '' };
  const [metaTags, setMetaTags] = useState(initialMeta);
  const [heroData, setHeroData] = useState();
  const { data } = useQuery(MAIN_QUERY, { variables: { uri, blogId }, fetchPolicy: 'no-cache' });

  useMetaTags(metaTags);

  useEffect(() => {
    if (data) {
      // set page title
      const { blogBy: blog } = data;
      const title = `Demo - ${blog.title}`;

      // set page keywords
      let keywords = title.replace(/[^a-zA-Z ]/g, "").split(' ');
      keywords = keywords.map(word => word.toLowerCase());
      keywords = keywords.filter(word => word.length > 0);
      keywords.push('article', 'blog');

      const heroBlock = blog.blocks.find(({ __typename }) => __typename === 'DemoHeroBlogBlock');
      const heroBlockImage = JSON.parse(heroBlock.attributes.image);

      setHeroData({
        attributes: {
          title: heroBlock.attributes.title,
          className: heroBlock.attributes.className,
          image: heroBlockImage,
          video: JSON.parse(heroBlock.attributes.video),
          date: blog.date,
          author: blog.author,
        }
      });

      // set meta tags
      setMetaTags({...metaTags, ...{
        title,
        description: 'demo site',
        metas: [
          {
            name: 'keywords',
            content: keywords.join(', '),
          },
          {
            name: 'robots',
            content: 'index, follow',
          },
          {
            name: 'url',
            content: window.location.href,
          },
          {
            property: 'fb:app_id',
            content: '706623926744907',
          },
          {
            'http-equiv': 'Cache-Control',
            content: 'no-cache',
          },
        ],
        links: [
          {
            rel: 'canonical',
            href: window.location.origin,
          },
        ],
        openGraph: {
          title,
          url: window.location.href,
          type: 'article',
          image: heroBlockImage.src,
          description: 'demo site',
          site_name: 'Demo',
        },
      }});
    }
  }, [data]);

  return data ? (
    <div className="page page--blog">
      { heroData && <HeroBlog {...heroData} /> }
      { renderContent(data) }
    </div>
  ) : null;
};

export default Blog;
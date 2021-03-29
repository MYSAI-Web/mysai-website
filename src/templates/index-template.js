import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import { getImage } from 'gatsby-plugin-image';
import UpcomingEvents from '../components/UpcomingEvents';
import NewBlogPosts from '../components/NewBlogPosts';

const IndexPage = ({ data }) => {
  const { frontmatter } = data.index;
  const image = getImage(frontmatter.main_image);
  const info = frontmatter.info;
  const upcomingEvents = data.upcoming_events.edges;
  return (
    <Layout>
      <SEO title="Home" />
      <Hero description={frontmatter.description} frontImage={image} />
      <Intro info={info} />
      <UpcomingEvents upcomingEvents={upcomingEvents}/>
      <NewBlogPosts />
      <Link to="/page-2/">Go to page 2</Link> <br />
    </Layout>
  );
};

export const data = graphql`
  query IndexQuery($currentDate: Date!) {
    upcoming_events: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "event-template" }
          event_start: { gte: $currentDate }
        }
      }
      sort: { fields: [frontmatter___event_start], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            event_start(formatString: "Do MMM YYYY h:mma")
            featured_image {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
    index: markdownRemark(
      frontmatter: { templateKey: { eq: "index-template" } }
    ) {
      frontmatter {
        description
        main_image {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        info {
          info_item {
            info_item_description
            info_title
          }
        }
      }
    }
  }
`;

export default IndexPage;

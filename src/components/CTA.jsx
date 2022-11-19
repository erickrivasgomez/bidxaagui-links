
import React, { useState, useEffect } from 'react';
import styles from "../style";
import Button from "./Button";
import { request, gql } from 'graphql-request';

const graphqlAPI = import.meta.env.VITE_APP_HYGRAPH_CONTENT_API_URL;

const CTA = () => {
  const [socialMediaLinks, setSocialMediaLinks] = useState({});

  useEffect(() => {
      async function fetchData() {
        // You can await here
         const socialMediaLinksGraphQL = (await getSocialMediaLinks()) || {};
         setSocialMediaLinks(socialMediaLinksGraphQL);
        // ...
      }
      fetchData();
  }, [])

  const getSocialMediaLinks = async () => {
    const query = gql`
      query MyQuery {
        socialMediaLinks {
          title
          url
        }
      }
      `;
  
    const result = await request(graphqlAPI, query);
  
    return result.socialMediaLinks;
  };

  return (
    socialMediaLinks.length > 0 &&
    socialMediaLinks.map(socialMediaLink => (
      <section key={socialMediaLink.title}  className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
        <a href={socialMediaLink.url} target="_blank">
        <div className="flex-1 flex flex-col">
          <h2 className={styles.heading2}>{socialMediaLink.title}</h2>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            [Comentario opcional]
          </p>
        </div>

        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
          <Button url={socialMediaLink.url} text={socialMediaLink.title} />
        </div>
        </a>
      </section>
    )));
}

export default CTA;

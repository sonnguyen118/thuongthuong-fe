import React from "react";
import Head from "next/head";
import { orEmpty } from "@utils/Selector/ramda";

interface PageSEOProps {
  pageSEO: {
    title: string;
    url: string;
    keywords: string[];
    description: string;
    image?: string;
  };
}

const HeadSEO: React.FC<PageSEOProps> = ({ pageSEO }) => {
  return (
    <Head>
      <title>{orEmpty("title", pageSEO)}</title>
      <meta charSet="UTF-8"></meta>
      <meta name="title" content={orEmpty("title", pageSEO)} />
      <meta name="keywords" content={orEmpty("keywords", pageSEO)} />
      <meta name="description" content={orEmpty("description", pageSEO)} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={orEmpty("url", pageSEO)} />
      <meta property="og:title" content={orEmpty("title", pageSEO)} />
      <meta
        property="og:description"
        content={orEmpty("description", pageSEO)}
      />
      {orEmpty("image", pageSEO) && (
        <meta property="og:image" content={orEmpty("image", pageSEO)} />
      )}
      php Copy code
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={orEmpty("url", pageSEO)} />
      <meta property="twitter:title" content={orEmpty("title", pageSEO)} />
      <meta
        property="twitter:description"
        content={orEmpty("description", pageSEO)}
      />
      {orEmpty("image", pageSEO) && (
        <meta property="twitter:image" content={orEmpty("image", pageSEO)} />
      )}
      <meta
        name="viewport"
        content="maximum-scale=1, initial-scale=1,width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover, maximum-scale=4.0"
      />
      <meta
        httpEquiv="Content-Security-Policy"
        content="frame-src *.30shine.com *.30shine.org *.google.com *.facebook.com *.appcues.com *.useinsider.com http://useinsider.com https://useinsider.com *.youtube.com https://www.youtube.com"
      />
      <link rel="canonical" href={orEmpty("url", pageSEO)} />
      <link rel="alternate" href={orEmpty("url", pageSEO)} hrefLang="vi-vn" />
    </Head>
  );
};

export default HeadSEO;

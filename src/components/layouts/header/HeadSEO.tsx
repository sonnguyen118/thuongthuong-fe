import React from "react";
import Head from "next/head";
import { orEmpty } from "@utils/Selector/ramda";

interface PageSEOProps {
  pageSEO: {
    title: string;
    keywords: string;
    description: string;
  };
  url: string;
  image: string;
}

const HeadSEO: React.FC<PageSEOProps> = ({ pageSEO, url, image }) => {
  return (
    <Head>
      <title>{orEmpty("title", pageSEO)}</title>
      <meta charSet="UTF-8"></meta>
      <meta name="title" content={orEmpty("title", pageSEO)} />
      <meta name="keywords" content={orEmpty("keywords", pageSEO)} />
      <meta name="description" content={orEmpty("description", pageSEO)} />
      <meta property="og:locale" content="vi_VN"></meta>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={orEmpty("title", pageSEO)} />
      <meta
        property="og:description"
        content={orEmpty("description", pageSEO)}
      />
      {image && <meta property="og:image" content={image} />}
      <meta
        property="article:modified_time"
        content="2023-08-28T09:39:44+00:00"
      ></meta>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={orEmpty("url", pageSEO)} />
      <meta property="twitter:title" content={orEmpty("title", pageSEO)} />
      <meta
        property="twitter:description"
        content={orEmpty("description", pageSEO)}
      />
      {image && <meta property="twitter:image" content={image} />}
      <meta
        name="viewport"
        content="maximum-scale=1, initial-scale=1,width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover, maximum-scale=4.0"
      />
      <meta
        httpEquiv="Content-Security-Policy"
        content="frame-src *.google.com *.facebook.com https://thuongthuonghandmade.vn/ https://thuongthuonghandmade.vn http://thuongthuonghandmade.vn http://thuongthuonghandmade.vn/ http://thuongthuong.net http://thuongthuong.net/ *.youtube.com https://www.youtube.com"
      />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      ></meta>
      <meta name="dlm-version" content="4.8.6"></meta>
      <link rel="canonical" href={url} />
      <link rel="alternate" href={url} hrefLang="vi-vn" />
      {/* <!-- / Yoast SEO Premium plugin. --> */}
      <link rel="dns-prefetch" href="//thuongthuonghandmade.vn"></link>
      <meta name="generator" content="Nextjs13"></meta>
      <link rel="shortlink" href="https://thuongthuonghandmade.vn/"></link>
    </Head>
  );
};

export default HeadSEO;

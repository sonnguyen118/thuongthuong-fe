import React from "react";

const Sitemap = () => {
  return <div />;
};

const withXMLTemplate = (content: string) => {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}</sitemapindex>`;
};
const withXMLFacebookProductFeedTemplate = (
  content: string,
  title: string,
  link: string
) => {
  return `<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">\n\t<title>${title}</title>\n\t<link rel="self" href="${link}"/>\n${content}\n</feed>`;
};
const withXMLGoogleProductFeedTemplate = (content: string) => {
  return `<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0" xmlns:c="http://base.google.com/cns/1.0">\n${content}\n</feed>`;
};

export async function getServerSideProps(context: any) {
  try {
    const listChildSitemaps: string[] = [
      "product-sitemap.xml",
      "brand-sitemap.xml",
      "group-sitemap.xml",
      "category-sitemap.xml",
      "static-sitemap.xml",
    ];
    const content: string = listChildSitemaps
      .map((item: string) => {
        return `<sitemap><loc>${process.env.NEXT_PUBLIC_FULL_URL}/${item}</loc></sitemap>`;
      })
      .join("");
    const sitemapContent = withXMLTemplate(content);
    const { res } = context;
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapContent);
    context.res.end();
    return { props: {} };
  } catch (e) {
    return { props: {} };
  }
}

export default Sitemap;

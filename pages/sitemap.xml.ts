// pages/sitemap.xml.ts
import {postAPI} from '@/modules';
import dayjs from 'dayjs';
import {NextPage} from 'next';

const SitemapPage: NextPage = () => {
  return null;
};

const insideXMLString = (xmlContent: string): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
      <loc>https://moco.run/</loc>
      <lastmod>${dayjs().format('YYYY-MM-DDTHH:mm:ssZ')}</lastmod>
    </url>
      ${xmlContent}
    </urlset>
  `;
};

SitemapPage.getInitialProps = async ctx => {
  const {res, req} = ctx;

  const data = await postAPI.getPostList({offset: 0, limit: 100});
  let pagesXML = '';

  for (const {id, createdDate} of data.posts) {
    pagesXML += `
      <url>
        <loc>https://moco.run/post?id=${id}</loc>
        <lastmod>${dayjs(createdDate).format('YYYY-MM-DDTHH:mm:ssZ')}</lastmod>
      </url>
    `;
  }

  const xmlContents = insideXMLString(pagesXML);

  if (res !== undefined) {
    res.setHeader('Content-Type', 'text/xml');

    res.write(xmlContents);

    res.end();
  }

  return {};
};

export default SitemapPage;

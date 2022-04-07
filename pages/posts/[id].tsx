import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.scss'
import Link from 'next/link';

type PostProps = {
  postData: {
    title: string,
    id: string,
    date: string,
    contentHtml: string
  }
};
export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <Link href="/">
        <a> Go Home </a>
      </Link>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.id === 'string') {
    const postData = await getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
  }
  return {
    props: {},
  };
};

export function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

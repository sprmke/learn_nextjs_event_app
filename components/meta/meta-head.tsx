import Head from 'next/head';

type MetaheadProps = {
  title: string;
  description: string;
};

const MetaHead = ({ title, description }: MetaheadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Head>
  );
};

export default MetaHead;

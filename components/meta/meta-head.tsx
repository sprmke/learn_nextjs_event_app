import Head from 'next/head';

type MetaheadProps = {
  title?: string;
  description?: string;
  viewport?: string;
};

const MetaHead = ({ title, description, viewport }: MetaheadProps) => {
  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name='description' content={description} />}
      {viewport && <meta name='viewport' content={viewport} />}
    </Head>
  );
};

export default MetaHead;

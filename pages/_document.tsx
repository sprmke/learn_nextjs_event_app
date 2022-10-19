import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body className='body-container'>
          <div id='overlays' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

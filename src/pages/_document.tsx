import * as React from 'react';
// next
import Document, { Html, Head, Main, NextScript } from 'next/document';
// @emotion
import createEmotionServer from '@emotion/server/create-instance';
// utils
import createEmotionCache from '../utils/createEmotionCache';
// theme
import { iranSansX } from '../theme/typography';

// ----------------------------------------------------------------------

//
export default function MyDocument(props: any) {
  return (
    <Html lang="en" dir="rtl">
      <Head>
        <meta charSet="utf-8" />

        {/* Favicon */}
        <link
          media="(prefers-color-scheme: light)"
          rel="icon"
          sizes="32x32"
          href="/dark_favicon.svg"
        />
        <link
          media="(prefers-color-scheme: dark)"
          rel="icon"
          sizes="32x32"
          href="/light_favicon.svg"
        />

        <link rel="manifest" href="/site.webmanifest" />

        {/* Emotion */}
        <meta name="emotion-insertion-point" content="" />
        {(props as any).emotionStyleTags}

        {/* Meta */}
        <meta name="description" content="" />
        <meta name="keywords" content="chess,chesstubes,chesstube" />
        <meta name="author" content="Mohammad Hajizadeh" />
      </Head>
      <body className={iranSansX.variable}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx: any) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props: any) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

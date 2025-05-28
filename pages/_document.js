import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="preload"
          href="/fonts/Sohne-Buch.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Sohne-Halbfett.woff"
          as="font"
          crossOrigin=""
        />

        <link rel="stylesheet" href="/css/react-grid-layout.css" />
        <link rel="stylesheet" href="/css/react-resizable.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        />
        <link href="/fontawesome/css/all.css" rel="stylesheet" />
        <link rel="stylesheet" href="/fonts/fonts.css" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
          crossOrigin="anonymous"
        />

        <script src="/js/mdb.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
          integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
          crossOrigin="anonymous"
        ></script>
        {/* BOOTSTRAP */}
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="/css/bootstrap-grid.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

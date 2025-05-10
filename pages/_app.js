import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathSenzaNavbar = ["/login", "/"];
  const urlDaUtenteLoggato = "/ricerca";
  const urlDaUtenteNonLoggato = "/login";

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (router.pathname === "/") {
        router.push(urlDaUtenteLoggato);
      }
    } else {
      if (router.pathname !== "/login") {
        router.push(urlDaUtenteNonLoggato);
      }
    }
  }, [router]);

  return (
    <>
      {puthead()}
      <header>
        {!pathSenzaNavbar.includes(router.pathname) ? (
          <header class="py-3 shadow-sm bg-white">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-auto">
                  {/* <img src="/beretta_img.png" /> */}
                  <h1 class="m-0 fs-4 fw-semibold">MeteoSystem</h1>
                </div>
                <div class="col text-end">
                  <nav>
                    <a
                      className="mx-2 text-dark text-decoration-none navLink"
                      href={"/ricerca"}
                    >
                      Ricerca Cliente
                    </a>
                    <Link
                      className="mx-2 text-dark text-decoration-none navLink"
                      href={"/interventi"}
                    >
                      {" "}
                      Interventi
                    </Link>
                    <Link
                      className="mx-2 text-dark text-decoration-none navLink"
                      href={"/giornate"}
                    >
                      {" "}
                      Giornate
                    </Link>
                    <Link
                      className="mx-2 text-dark text-decoration-none navLink"
                      href={"/garanzie"}
                    >
                      {" "}
                      Garanzie
                    </Link>
                    <Link
                      className="mx-2 text-dark text-decoration-none navLink"
                      href={"/manutenzioni"}
                    >
                      {" "}
                      Manutenzioni
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </header>
        ) : (
          <></>
        )}
      </header>
      <Component router={router} {...pageProps} />
    </>
  );

  function puthead() {
    return (
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
        {/**MASONRY */}

        <title>Zio Mimmo Search</title>

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
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
          integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
          crossOrigin="anonymous"
        ></script>
      </Head>
    );
  }
}

export default MyApp;

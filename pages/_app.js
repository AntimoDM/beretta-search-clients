import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathSenzaNavbar = ["/login", "/"];
  const urlDaUtenteLoggato = "/clienti";
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
          <header className="py-3 shadow-sm bg-white">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-auto">
                  {/* <img src="/beretta_img.png" /> */}
                  <h1 className="m-0 fs-4 fw-semibold">MeteoSystem</h1>
                </div>
                <div className="col text-end">
                  <nav>
                    <a
                      className="mx-2 text-dark text-decoration-none navLink"
                      href={"/clienti"}
                    >
                      Clienti
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
        <title>Meteo System</title>
      </Head>
    );
  }
}

export default MyApp;

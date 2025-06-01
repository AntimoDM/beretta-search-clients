import React, { useState } from "react";
import Swal from "sweetalert2";
import Bottone from "../Bottone/Bottone";
import "./login.scss";
import Carta from "../Carta/Carta";
export default function Login({ ctaLogin = () => null }) {
  const [utente, setUtente] = useState({});
  return (
    <Carta className="pl-24 pr-24 pt-32 pb-32 m-auto login">
      <h2>Bentornato</h2>
      <h4>Effettua il login con le tue credenziali</h4>
      <div className="mt-24">
        <input
          value={utente.nome_utente || ""}
          placeholder="Utente"
          onChange={(e) =>
            setUtente({ ...utente, nome_utente: e.target.value })
          }
        />
      </div>
      <div className="mt-24">
        <input
          value={utente.password || ""}
          placeholder="Password"
          type="password"
          onChange={(e) => setUtente({ ...utente, password: e.target.value })}
        />
      </div>
      <Bottone
        onClick={() => {
          effettuaLogin();
        }}
        className="w-100 mt-24"
      >
        Login
      </Bottone>
    </Carta>
  );

  function effettuaLogin() {
    if (utente.nome_utente && utente.password) {
      ctaLogin(utente);
    } else {
      Swal.fire(
        "Credenziali mancanti",
        "Compila Utente e Password!",
        "warning"
      );
    }
  }
}

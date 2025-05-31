import React, { useState } from "react";
import styles from "@/styles/common.module.scss";
import Swal from "sweetalert2";
import Button from "../Button/Button";
import Carta from "../Carta/Carta";
export default function Login({ onClick = () => null }) {
  const [user, setUser] = useState({});
  return (
    <Carta className={"p-24 " + styles.login}>
      <h2>Bentornato</h2>
      <h4 className={styles.sub_title}>
        Effettua il login con le tue credenziali
      </h4>
      <div className="form-group mb-16 h-56">
        <input
          value={user.username || ""}
          placeholder="Utente"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div className="form-group mb-24 h-56">
        <input
          value={user.password || ""}
          placeholder="Password"
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <Button
        onClick={() => {
          effettuaLogin();
        }}
        className="w-100 h-64"
      >
        Login
      </Button>
    </Carta>
  );

  function effettuaLogin() {
    if (user.username && user.password()) {
      onClick(user);
    } else {
      Swal.fire(
        "Credenziali mancanti",
        "Compila Utente e Password!",
        "warning"
      );
    }
  }
}

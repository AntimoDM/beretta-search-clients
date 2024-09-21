import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import styles from "@/styles/common.module.scss";
import api from "@/src/helper/api";
import Card from "../Card";
import Link from "next/link";
import Button from "../Button";
import Swal from "sweetalert2";
export default function Login({ onClick = () => null }) {
  const [user, setUser] = useState({});

  return (
    <>
      <Card className={"p-24  " + styles.login}>
        <h1 style={{ fontSize: "30px" }}>Bentornato</h1>

        <h3
          style={{ paddingRight: "56px", fontSize: "30px" }}
          className={styles.sub_title}
        >
          Effettua il login con le tue credenziali
        </h3>
        <div className="form-group mb-16 h-56">
          <input
            container_className="h-56"
            className="w-100"
            value={user.username}
            placeholder="Utente"
            type="header"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

        <div className="form-group mb-24 h-56">
          <input
            container_className="h-56"
            className="w-100"
            value={user.password}
            placeholder="Password"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <small className={styles.gray}>
          <Link className="text-gray" href="#">
            Hai dimenticato la password?
          </Link>
        </small>
        <Button
          onClick={() => {
            effettuaLogin();
          }}
          className="w-100 mt-16 py-24 h-64 lh-19"
          variant="danger"
          style={{ background: "#AEC60D" }}
        >
          <span
            style={{
              fontFamily: "Sohne-Kraftig",
              fontSize: "16px",
              lineHeight: "19px",
              color: "white",
            }}
          >
            Effettua il login
          </span>
        </Button>
      </Card>
      <LoadingIndicator />
    </>
  );

  function credenzialiCompilate() {
    return user.username !== undefined && user.password !== undefined;
  }

  function effettuaLogin() {
    if (credenzialiCompilate()) {
      onClick(user);
    } else {
      Swal.fire("Campi mancanti", "Compila Utente e Password!", "warning");
    }
  }
}

import React, { useEffect, useState } from "react";

import Login from "@/src/components/atoms/Login/Login";
import { effettuaLogin } from "@/src/utils/utility";
import Swal from "sweetalert2";

export default function PaginaLogin({ router }) {
  return (
    <div style={{ paddingTop: "150px" }} className="page-container-new">
      <Login
        ctaLogin={(user) => {
          if (effettuaLogin(user)) {
            localStorage.setItem("user", user.username);
            router.push("/clienti");
          } else {
            Swal.fire("Errore", "Credenziali Errate!", "error");
          }
        }}
      />
    </div>
  );
}

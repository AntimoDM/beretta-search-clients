import React, { useEffect, useState } from "react";

import Login from "@/src/components/atoms/Login/Login";

export default function LoginPage({ router }) {
  return (
    <Login
      onClick={(user) => {
        localStorage.setItem("user", user.username);
        router.push("/ricerca");
      }}
    />
  );
}

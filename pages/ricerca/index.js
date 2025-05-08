import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import PageTitle from "@/src/components/molecules/PageTitle";
import ModifyHeader from "@/src/components/molecules/ModifyHeader";
import api from "@/src/helper/api";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import Button from "@/src/components/atoms/Button";
import Card from "@/src/components/atoms/Card";
import { default as Link } from "next/link";
import Head from "next/head";

export default function RicercaClienti({ router = {}, user, permission }) {
  const [vals, setVals] = useState({});

  return (
    <div className="page-container-new">
      <PageTitle
        right={
          <>
            <Link href="/ricerca/nuovo">
              <Button beretta={true}>Aggiungi Cliente</Button>
            </Link>
          </>
        }
        page
      >
        <div className="p-0 m-0">
          <h4 className="d-inline font-24 lh-24 bolder">Ricerca Cliente</h4>
        </div>
      </PageTitle>

      <Card className="mb-32 p-24">
        <div className="row">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Telefono</label>
            <input
              className="d-block w-100 input_beretta"
              value={vals.phone_number}
              onChange={(e) => {
                setVals({ ...vals, phone_number: e.target.value });
              }}
              onKeyDown={(e) =>
                e.key == "Enter" && router.push("/ricerca/" + vals.phone_number)
              }
              id="phone_number"
            />
          </div>
        </div>

        {/* <div className="row mt-16">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Via</label>
            <input
              className="d-block w-100"
              value={vals.street}
              onChange={(e) => {
                setVals({ ...vals, street: e.target.value });
              }}
              onKeyDown={(e) => console.log("ricerca")}
              id="street"
            />
          </div>
        </div> */}
      </Card>

      <LoadingIndicator />
    </div>
  );
}

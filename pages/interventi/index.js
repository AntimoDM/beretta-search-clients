import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "@/src/components/atoms/Button";
import HeaderTab from "@/src/components/atoms/HeaderTab/HeaderTab";
import Load from "@/src/components/atoms/Load";
import Link from "next/link";
import Card from "@/src/components/atoms/Card";
import CardToolbar from "@/src/components/molecules/CardToolbar/CardToolbar";
import PageTitle from "@/src/components/molecules/PageTitle";
import SearchBar from "@/src/components/molecules/SearchBar/SearchBar";
import { trackPromise } from "react-promise-tracker";
import api from "@/src/utils/api";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import {
  formatDate,
  generaOpzioniTecnici,
  visualizzaNomeCliente,
  visualizzaStatoIntervento,
} from "@/src/utils/utility";
import { TECNICI } from "@/src/model/Tecnici";

export default function Interventi({ permission, router, language_ids }) {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [headerTab, setHeaderTab] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [limit, setLimit] = useState(50);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    api.ricerca_interventi(headerTab, filters.tecnico || "").then((value) => {
      if (value) {
        setRecs(value);
        setTotal(value.length);
      }
    });
  }, [headerTab, filters]);

  useEffect(() => {
    resettaSelect();
  }, []);

  return (
    <div className="page-container-new">
      <PageTitle
        page
        right={
          <>
            <Link href="/interventi/nuovo">
              <Button>Aggiungi Intervento</Button>
            </Link>
          </>
        }
      >
        <h4>Interventi</h4>
      </PageTitle>

      <Card>
        <HeaderTab>
          <a
            onClick={() => setHeaderTab("")}
            className={"nav-link " + (headerTab === "" ? "active" : "")}
            href="#"
          >
            Tutti
          </a>
          <a
            onClick={() => setHeaderTab(1)}
            className={"nav-link " + (headerTab === 1 ? "active" : "")}
            href="#"
          >
            Nuovi
          </a>
          <a
            onClick={() => setHeaderTab(2)}
            className={"nav-link " + (headerTab === 2 ? "active" : "")}
            href="#"
          >
            Assegnati
          </a>
          <a
            onClick={() => setHeaderTab(3)}
            className={"nav-link " + (headerTab === 3 ? "active" : "")}
            href="#"
          >
            Completi
          </a>
        </HeaderTab>

        <CardToolbar className="align-items-center pl-24">
          <select
            onChange={(e) => {
              const value = e.target.value;
              setFilters({
                ...filters,
                tecnico: parseInt(value),
              });

              if (value === "0") {
                resettaSelect();
              }
            }}
            id="miaSelect"
            style={{ display: "block", width: "25%" }}
            placeholder={"Tecnico"}
            className="h-40 pl-0"
          >
            {generaOpzioniTecnici()}
          </select>

          <div className="row mt-8 w-100 my-auto pl-0 pr-24">
            <div className="col-6 pl-0 text-left">
              <p className="font-16 lh-24 text-gray ordina_per">
                {total} record trovati{" "}
              </p>
            </div>
            <div className="col-6 pr-0 text-right">
              <div className="d-flex flex-row-reverse">
                <select
                  style={{ display: "block", width: "20%" }}
                  placeholder={"Tecnico"}
                  className="h-40 pl-0"
                >
                  <option selected={limit === 5} onClick={() => setLimit(5)}>
                    5
                  </option>
                  <option selected={limit === 50} onClick={() => setLimit(50)}>
                    50
                  </option>
                </select>

                <p className="font-16 my-auto mr-16 lh-24 text-gray">
                  Per pagina
                </p>
              </div>
            </div>
          </div>
        </CardToolbar>
        <div className="row table_header pr-24">
          <div
            style={{ width: "16px", paddingTop: "2px" }}
            className="ml-24 mr-8"
          >
            <input
              onChange={() => {
                if (recs.length === selectedIds.length) setSelectedIds([]);
                else setSelectedIds(recs.map((single) => single.id));
              }}
              checked={
                selectedIds.length > 0 && recs.length === selectedIds.length
              }
              type="checkbox"
            />
          </div>
          <div
            onClick={() =>
              orderBy === "name asc"
                ? setOrderBy("name desc")
                : setOrderBy("name asc")
            }
            style={{ cursor: "pointer" }}
            className=" col my-auto"
          >
            <label className="m-0">Cliente</label>

            {orderBy === "name asc" ? (
              <img
                className="ml-8"
                src="/media/icon/freccia_su_accordion.svg"
              ></img>
            ) : orderBy === "name desc" ? (
              <img
                className="ml-8"
                src="/media/icon/freccia_giu_accordion.svg"
              ></img>
            ) : (
              <></>
            )}
          </div>
          <div style={{ cursor: "pointer" }} className=" col my-auto">
            <label className="m-0">Data Chiamata</label>
          </div>
          <div style={{ cursor: "pointer" }} className=" col my-auto">
            <label className="m-0">Tecnico</label>
          </div>
          <div
            style={{ cursor: "pointer" }}
            className="col pr-0 my-auto ml-auto text-end"
          >
            <label className="m-0">Stato</label>
          </div>
        </div>
        <div
          onScroll={(e) => {
            infiniteScroll(e);
          }}
          id="rowcontainer"
          className={"row_container " + (loading ? " loading" : " ")}
        >
          {recs.map((element, index) => {
            return (
              <Link
                href={"/interventi/" + element.id}
                key={index}
                className="row table_row h-56"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: "16px", paddingTop: "2px" }}
                  className="ml-24 mr-8"
                >
                  <input
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={() => {
                      manageSelect(element.id);
                    }}
                    checked={selectedIds.indexOf(element.id) > -1}
                    type="checkbox"
                  />
                </div>
                <div className="col my-auto">
                  <p
                    style={{ width: "90%" }}
                    className="tooltip_bold bold my-0 text-truncate d-block"
                    title={element.name}
                  >
                    {visualizzaNomeCliente(element.cliente)}
                  </p>
                </div>
                <div className=" col my-auto">
                  {formatDate(element.data_chiamata)}
                </div>
                <div className=" col my-auto">
                  {element.tecnico && element.tecnico.nome}
                </div>
                <div className="text-end col my-auto pr-24">
                  {visualizzaStatoIntervento(element.stato)}
                </div>
              </Link>
            );
          })}
        </div>
      </Card>

      {infiniteLoading && <Load text="Carico altri brand" />}
      <LoadingIndicator />
    </div>
  );

  function manageSelect(id) {
    var newSelectedIds;
    if (selectedIds.indexOf(id) > -1) {
      newSelectedIds = selectedIds.filter((single) => {
        return single !== id;
      });
      setSelectedIds(newSelectedIds);
    } else {
      newSelectedIds = selectedIds.concat(id);
      setSelectedIds(newSelectedIds);
    }
  }

  function infiniteScroll(e) {
    if (
      e.target.scrollHeight - e.target.scrollTop < 1200 &&
      !infiniteLoading &&
      recs.length > 0 &&
      offset + 50 < total
    ) {
      setInfiniteLoading(true);
      setOffset(
        offset < total - 50 ? offset + 50 : total - 50 > 0 ? total - 50 : 0
      );
    }
  }

  function resettaSelect() {
    const miaSelect = document.getElementById("miaSelect");
    miaSelect.selectedIndex = 0;
  }
}

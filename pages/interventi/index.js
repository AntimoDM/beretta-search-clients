import React, { useEffect, useState } from "react";
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
import api from "@/src/helper/api";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import { formatDate } from "@/src/helper/utility";
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
    api.ricerca_interventi(headerTab).then((value) => {
      if (value) {
        setRecs(value);
        setTotal(value.length);
      }
    });
  }, [headerTab]);

  return (
    <div className="page-container-new">
      <PageTitle
        page
        right={
          <>
            <Link href="/interventi/nuovo">
              <Button className="button_medium" color="green">
                Aggiungi Intervento
              </Button>
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
          <SearchBar
            value={TECNICI.find((el) => el.label == filters.tecnico)}
            className="w-25 h-40 pl-0"
            placeholder={"Tecnico"}
            onChange={(e) => setFilters({ ...filters, tecnico: e.label })}
            options={[TECNICI.concat([{ label: "Annulla", value: "0" }])]}
          />
          <div className="row mt-8 w-100 my-auto pl-0 pr-24">
            <div className="col-6 pl-0 text-left">
              <p className="font-16 lh-24 text-gray ordina_per">
                {total} record trovati{" "}
              </p>
            </div>
            <div className="col-6 pr-0 text-right">
              <div className="d-flex flex-row-reverse">
                <SearchBar
                  placeholder={limit}
                  options={[
                    { label: "5", value: 5 },
                    { label: "20", value: 20 },
                    { label: "30", value: 30 },
                    { label: "50", value: 50 },
                    { label: "100", value: 100 },
                    { label: "150", value: 150 },
                    { label: "200", value: 200 },
                    { label: "500", value: 500 },
                    { label: "1000", value: 1000 },
                    { label: "1500", value: 1500 },
                  ]}
                  onChange={(e) => {
                    setLimit(e.value);
                  }}
                />
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
            Cliente
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
            Data Chiamata
          </div>
          <div style={{ cursor: "pointer" }} className=" col my-auto">
            Tecnico
          </div>
          <div
            style={{ cursor: "pointer" }}
            className="col pr-0 my-auto ml-auto text-end"
          >
            Stato
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
                    {element.cliente &&
                      element.cliente.nome + " " + element.cliente.cognome}
                  </p>
                </div>
                <div className=" col my-auto">
                  {formatDate(element.data_chiamata)}
                </div>
                <div className=" col my-auto">{element.tecnico}</div>
                <div className="text-end col my-auto pr-24">
                  {element.stato}
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
}

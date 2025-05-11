import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "@/src/components/atoms/Button";
import HeaderTab from "@/src/components/atoms/HeaderTab/HeaderTab";
//import SearchBarV2 from "../../src/components/atoms/SearchBarV2/SearchBarV2";
import Load from "@/src/components/atoms/Load";
import Link from "next/link";
import Card from "@/src/components/atoms/Card";
import CardToolbar from "@/src/components/molecules/CardToolbar/CardToolbar";
import PageTitle from "@/src/components/molecules/PageTitle";
import SearchBar from "@/src/components/molecules/SearchBar/SearchBar";
import { trackPromise } from "react-promise-tracker";
import api from "@/src/helper/api";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import { formatDate, generaOpzioniTecnici } from "@/src/helper/utility";

export default function designers({ permission, router, language_ids }) {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [header_tab, setHeader_tab] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [selected_ids, setSelectedIds] = useState([]);
  const [limit, setLimit] = useState(50);
  const [filters, setFilters] = useState({});
  const [lang, setLang] = useState("it_IT");

  useEffect(() => {
    trackPromise(
      api.search_giornate(filters.tecnico || "").then((value) => {
        if (value) {
          setTotal(value.length);
          setDesigners(value);
        }
      })
    );
  }, [filters]);

  useEffect(() => {
    resettaSelect();
  }, []);

  const manageSelect = (id) => {
    var newSelectedIds;
    if (selected_ids.indexOf(id) > -1) {
      newSelectedIds = selected_ids.filter((single) => {
        return single !== id;
      });
      setSelectedIds(newSelectedIds);
    } else {
      newSelectedIds = selected_ids.concat(id);
      setSelectedIds(newSelectedIds);
    }
  };
  function infiniteScroll(e) {
    if (
      e.target.scrollHeight - e.target.scrollTop < 1200 &&
      !infiniteLoading &&
      designers.length > 0 &&
      offset + 50 < total
    ) {
      setInfiniteLoading(true);
      setOffset(
        offset < total - 50 ? offset + 50 : total - 50 > 0 ? total - 50 : 0
      );
    }
  }

  return (
    <div className="page-container-new">
      <PageTitle
        page
        right={
          <>
            <Link href="/giornate/nuovo">
              <Button>Aggiungi Giornata</Button>
            </Link>
          </>
        }
      >
        <h4>Giornate</h4>
      </PageTitle>

      <Card>
        <HeaderTab>
          <a
            onClick={() => setHeader_tab("")}
            className={"nav-link " + (header_tab === "" ? "active" : "")}
            href="#"
          >
            Tutti
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
                if (designers.length === selected_ids.length)
                  setSelectedIds([]);
                else setSelectedIds(designers.map((single) => single.id));
              }}
              checked={
                selected_ids.length > 0 &&
                designers.length === selected_ids.length
              }
              type="checkbox"
            />
          </div>
          <div style={{ cursor: "pointer" }} className=" col my-auto">
            <label className="m-0">Giorno</label>
          </div>
          <div
            style={{ cursor: "pointer" }}
            className="col pr-0 my-auto ml-auto text-end"
          >
            <label className="m-0">Tecnico</label>
          </div>
        </div>
        <div
          onScroll={(e) => {
            infiniteScroll(e);
          }}
          id="rowcontainer"
          className={"row_container " + (loading ? " loading" : " ")}
        >
          {designers.map((element, index) => {
            return (
              <Link
                href={"/giornate/" + element.id}
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
                    checked={selected_ids.indexOf(element.id) > -1}
                    type="checkbox"
                  />
                </div>
                <div className=" col my-auto">{formatDate(element.data)}</div>

                <div className="text-end col my-auto pr-24">
                  {element.tecnico && element.tecnico.nome}
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

  function resettaSelect() {
    const miaSelect = document.getElementById("miaSelect");
    miaSelect.selectedIndex = 0;
  }
}

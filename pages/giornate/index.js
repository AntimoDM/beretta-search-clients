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
import { formatDate } from "@/src/helper/utility";
import { tecnici } from "@/src/model/Tecnici";

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
      api.search_giornate().then((value) => {
        if (value) {
          setDesigners(value);
        }
      })
    );
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
              <Button className="button_medium" color="green">
                Aggiungi Giornata
              </Button>
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
          <SearchBar
            value={tecnici.find((el) => el.label == filters.tecnico)}
            className="w-25 h-40 pl-0"
            placeholder={"Tecnico"}
            onChange={(e) => setFilters({ ...filters, tecnico: e.label })}
            options={[tecnici.concat([{ label: "Annulla", value: "0" }])]}
          />
          {/* <SearchBarV2
            fullWidth
            lang={lang}
            placeholder={"Filtra i designers"}
            model={"product.designer"}
            rows={designers}
            tab_domain={header_tab}
            setRows={setDesigners}
            limit={limit}
            offset={offset}
            setTotal={setTotal}
            order_by={orderBy}
            setInfiniteLoading={setInfiniteLoading}
            options={[{ label: "Nome Designer", value: "name", type: "auto" }]}
          /> */}
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
            Giorno
          </div>
          <div style={{ cursor: "pointer" }} className=" col my-auto">
            Tecnico
          </div>
          <div
            style={{ cursor: "pointer" }}
            className="col pr-0 my-auto ml-auto text-end"
          >
            Ore impiegate
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
                <div className=" col my-auto">{formatDate(element.giorno)}</div>
                <div className="col my-auto">{element.tecnico}</div>

                <div className="text-end col my-auto pr-24">
                  {element.ore_impegnate}
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
}

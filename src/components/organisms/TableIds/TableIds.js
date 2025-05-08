import React, { useEffect, useState } from "react";
import Card from "../../atoms/Card";
import Modal from "../../atoms/Modal/Modal";
import CardCouponIds from "../../molecules/CardCouponIds/CardCouponIds";
import { formatDate, visualizzaStatoIntervento } from "@/src/helper/utility";

export default function TabellaInterventi({
  interventi = [{}],
  onSave,
  edit = true,
  clienteID,
}) {
  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [selected_ids, setSelectedIds] = useState([]);
  const [modifyRow, setModifyRow] = useState({});

  const [cardinterventiOpen, setCardinterventiOpen] = useState(false);
  const [idSelezionato, setIdSelezionato] = useState(1);

  return (
    <>
      <Card style={{ border: "1px solid #CED4DA ", borderRadius: 0 }}>
        <div style={{ overflowY: "auto", fontSize: "16px" }} id="rowcontainer">
          <table className="table table-striped table-bordered nowraptable stickyHead">
            <thead>
              <tr>
                <th scope="col">Data Chiamata</th>
                <th scope="col">Stato</th>
                <th scope="col">Tecnico</th>
                <th scope="col">Data Assegnamento</th>
                <th scope="col">Data completamento</th>
                <th scope="col">Motivazione Chiamata</th>
                <th scope="col">Note per il Tecnico</th>
                <th scope="col">Note del Tecnico</th>
              </tr>
            </thead>
            <tbody>
              {interventi.map((single) => {
                return (
                  <tr
                    onClick={() => {
                      setModifyRow(single);
                      setIdSelezionato(single.id);
                      setCardinterventiOpen(true);

                      $("#card_interventi_ids_" + idSelezionato).modal(
                        "toggle"
                      );
                    }}
                    className="tr_border_hover"
                    style={{ cursor: "pointer" }}
                    key={single.id}
                  >
                    <td scope="col">
                      {formatDate(single.data_chiamata) || ""}
                    </td>
                    <td scope="col">
                      {visualizzaStatoIntervento(single.stato) || ""}
                    </td>
                    <td scope="col">
                      {single.tecnico === 1 ? "Danilo" : "Mimmo"}
                    </td>
                    <td scope="col">
                      {formatDate(single.data_assegnamento) || ""}
                    </td>
                    <td scope="col">
                      {formatDate(single.data_completamento) || ""}
                    </td>
                    <td scope="col">{single.motivazione || ""}</td>
                    <td scope="col">{single.note_per_tecnico || ""}</td>
                    <td scope="col">{single.note_del_tecnico || ""}</td>
                  </tr>
                );
              })}
              {edit && (
                <tr
                  onClick={(e) => {
                    setModifyRow({});
                    setIdSelezionato(1);
                    setCardinterventiOpen(true);

                    $("#card_interventi_ids_" + idSelezionato).modal("toggle");
                  }}
                >
                  <th style={{ cursor: "pointer" }} colSpan={22}>
                    Aggiungi...
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal
        style={{ margin: "auto", width: "1000px" }}
        id={"card_interventi_ids_" + idSelezionato}
      >
        {cardinterventiOpen && (
          <CardCouponIds
            onClose={() => {
              $("#card_interventi_ids_" + idSelezionato).modal("toggle");
              setSelectedIds([]);
              setIdSelezionato(1);
              setCardinterventiOpen(false);
            }}
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }}
            modifyRow={modifyRow}
            onSave={(value) => {
              onSave(value);
            }}
            clienteID={clienteID}
          ></CardCouponIds>
        )}
      </Modal>
    </>
  );

  function manageSelect(id) {
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
  }
}

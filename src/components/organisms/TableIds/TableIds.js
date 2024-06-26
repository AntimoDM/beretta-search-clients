import React, { useEffect, useState } from "react";
import Card from "../../atoms/Card";
import Modal from "../../atoms/Modal/Modal";
import CardCouponIds from "../../molecules/CardCouponIds/CardCouponIds";
import { formatDate } from "@/src/helper/utility";

export default function TabellaInterventi({
  interventi = [{}],
  onSave,
  edit = true,
}) {
  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [selected_ids, setSelectedIds] = useState([]);
  const [modifyRow, setModifyRow] = useState({});

  const [cardinterventiOpen, setCardinterventiOpen] = useState(false);
  const [idSelezionato, setIdSelezionato] = useState(1);

  return (
    <>
      <Card>
        <div style={{ overflowY: "auto", fontSize: "16px" }} id="rowcontainer">
          <table className="table table-striped table-bordered nowraptable stickyHead">
            <thead>
              <tr>
                <th scope="col">Data Chiamata</th>
                <th scope="col">Motivazione Chiamata</th>
                <th scope="col">Note per il Tecnico</th>
                <th scope="col">Note del Tecnico</th>
                <th scope="col">Data completamento</th>
                <th scope="col">Stato</th>
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
                    <td scope="col">{single.motivazione || ""}</td>
                    <td scope="col">{single.note_per_tecnico || ""}</td>
                    <td scope="col">{single.note_del_tecnico || ""}</td>
                    <td scope="col">
                      {formatDate(single.data_completamento) || ""}
                    </td>

                    <td scope="col">{single.stato}</td>
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
            onClick={() => {
              $("#card_interventi_ids_" + idSelezionato).modal("toggle");
              setSelectedIds([]);
              setIdSelezionato(1);
              setCardinterventiOpen(false);
            }}
            modifyRow={modifyRow}
            onSave={(value) => {
              onSave(value);
            }}
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

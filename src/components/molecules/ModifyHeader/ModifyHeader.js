import style from "../../../../styles/common.module.scss";
import $ from "jquery";
import React, { useEffect, useState } from "react";

import PageTitle from "../PageTitle";
import Button from "../../atoms/Button/Button";
const ModifyHeader = ({ toggle, onSave, onRemove, nolabel }) => {
  const [logow, setLogow] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if ($(".card_support")[0])
        setLogow(
          ($(".card_support")[0].offsetParent.offsetLeft >
          $(".card_support")[0].offsetLeft
            ? $(".card_support")[0].offsetParent.offsetLeft
            : $(".card_support")[0].offsetLeft) +
            26 +
            $("#sidebar").innerWidth()
        );
    }, 400);

    setLogow($("#header").outerHeight());
  }, []);
  return (
    <div
      className={style.modify_header + " row " + (toggle ? style.active : " ")}
    >
      <div style={{ width: "50%", opacity: logow > 0 ? "1" : "0" }} />
      <PageTitle
        className="pr-24 pl-0 pb-16 pt-16 col m-0"
        right={
          <>
            {onRemove && (
              <Button color="grigio" onClick={onRemove} className="mr-24  ">
                Annulla
              </Button>
            )}
            {onSave && <Button onClick={onSave}>Salva</Button>}
          </>
        }
      >
        {!nolabel && (
          <span style={{ fontSize: "18px" }} className="text-light pl-16">
            Modifiche non salvate
          </span>
        )}
      </PageTitle>
    </div>
  );
};
export default ModifyHeader;

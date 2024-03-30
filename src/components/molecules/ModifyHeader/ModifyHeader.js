import style from "../../../../styles/common.module.scss";
import $ from "jquery";
import React, { useEffect, useState } from "react";

import PageTitle from "../PageTitle";
import Button from "../../atoms/Button";
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
      <div style={{ width: "80%", opacity: logow > 0 ? "1" : "0" }} />
      <PageTitle
        className="pr-24 pl-0 pb-16 pt-16 col m-0"
        right={
          <>
            {onRemove && (
              <Button
                onClick={onRemove}
                className="mr-24 button_normal "
                color="light"
              >
                Annulla
              </Button>
            )}
            {onSave && (
              <Button color="light" className="button_normal" onClick={onSave}>
                Salva
              </Button>
            )}
          </>
        }
      >
        {!nolabel && (
          <span className="text-light pl-16">Modifiche non salvate</span>
        )}
      </PageTitle>
    </div>
  );
};
export default ModifyHeader;

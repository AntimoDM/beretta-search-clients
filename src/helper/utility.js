import React from "react";
import style from "../../styles/common.module.scss";
import $ from "jquery";
import Swal from "sweetalert2";
import { useRef, useEffect } from "react";
export function renderPulseState(status) {
  if (status) {
    switch (status.toUpperCase()) {
      case "FAILED":
        return <span className={style.pulseState + " " + style.black}></span>;
      case "DONE":
        return <span className={style.pulseState + " " + style.green}></span>;
      case "SYNC":
        return (
          <span
            style={{ width: "20px" }}
            className={style.pulseState + " " + style.green}
          ></span>
        );
      case "PENDING":
        return (
          <span
            style={{ width: "20px" }}
            className={style.pulseState + " " + style.orange}
          ></span>
        );
      case "NOT_SYNCHRONIZABLE":
        return (
          <span
            style={{ width: "20px" }}
            className={style.pulseState + " " + style.black}
          ></span>
        );
      case "NOT_SYNC":
        return (
          <span
            style={{ width: "20px" }}
            className={style.pulseState + " " + style.red}
          ></span>
        );
      default:
        return (
          <span
            style={{ width: "20px" }}
            className={style.pulseState + " " + style.red}
          ></span>
        );
    }
  }
}
export function stringToSlug(str) {
  let arr_str = [];
  let ext = false;
  if (!str) return;
  if (str.includes(".")) {
    arr_str = str.split(".");
    str = arr_str[0];
    ext = arr_str[1];
  }
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return ext ? str + "." + stringToSlug(ext) : str;
}
export function AddOneHour(date) {
  if (!date) return false;
  let new_date = new Date(date);
  new_date.setTime(new_date.getTime() + 60 * 60 * 1000);
  return new_date;
}
export function colorStatus(status) {
  if (status)
    switch (status.toUpperCase()) {
      case "NON ATTIVO":
        return (
          <span className={style.status + " " + style.orange}>Archiviato</span>
        );
      case "FAILED":
        return <span className={style.status + " " + style.red}>Fallito</span>;
      case "DONE":
        return <span className={style.status + " " + style.green}>Fatto</span>;
      case "SYNC":
        return (
          <span className={style.status + " " + style.green}>
            Sincronizzato
          </span>
        );
      case "ENQUEUED":
        return (
          <span className={style.status + " " + style.lightblue}>In Coda</span>
        );
      case "PENDING":
        return (
          <span className={style.status + " " + style.orange}>Pending</span>
        );
      case "NOT_SYNC":
        return (
          <span className={style.status + " " + style.red}>
            <span>Non Sincronizzato</span>
          </span>
        );
      case "NOT_SYNCHRONIZABLE":
        return (
          <span className={style.status + " " + style.red}>
            <span> Non Sincronizzabile</span>
          </span>
        );
      case "DRAFT":
        return (
          <span className={style.status + " " + style.gray}>{status}</span>
        );
      case "PREVENTIVO INVIATO":
        return (
          <span className={style.status + " " + style.orange}>Inviato</span>
        );
      case "PREVENTIVO ACCETTATO":
        return (
          <span className={style.status + " " + style.green}>Accettato</span>
        );
      case "ANNULLATO":
        return <span className={style.status + " " + style.red}>{status}</span>;
      case "BLOCCATO":
        return (
          <span className={style.status + " " + style.orange}>{status}</span>
        );
      case "ISCRIZIONE EFFETTUATA":
        return (
          <span className={style.status + " " + style.green}>{status}</span>
        );
      case "ISCRIZIONE NON EFFETTUATA":
        return <span className={style.status + " " + style.red}>{status}</span>;
      case "ORDINE DI VENDITA":
        return <span className={style.status + " " + style.red}>Ordine</span>;
      case "0":
        return <span className={style.status + " " + style.orange}>Bassa</span>;
      case "1":
        return <span className={style.status + " " + style.gray}>Media</span>;
      case "2":
        return <span className={style.status + " " + style.green}>Alta</span>;
      case "3":
        return <span className={style.status + " " + style.red}>Urgente</span>;
      case "EVASO PARZIALMENTE":
        return (
          <span className={style.status + " " + style.yellow}>
            Evaso Parzialmente
          </span>
        );

      default:
        return <span className={style.status}>{status}</span>;
    }
}

export function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}
export function formatDate(data) {
  if (data)
    return new Date(data).toLocaleString("it-IT", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  else return "//";
}
export function formatPrice(value) {
  return Number(value).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });
}
export function formatDatewithHours(data) {
  if (data)
    return new Date(data).toLocaleString("it-IT", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  else return "";
}
export function formatDateVecchio(data) {
  if (data)
    return new Date(data).toLocaleString("it-IT", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  else return "//";
}

export function permissionRedirect(router) {
  Swal.fire(
    "Attenzione",
    "Non hai i permessi per visualizzare questa sezione",
    "warning"
  ).then(() => {
    router.back();
  });
  return <div></div>;
}

export function renderDate(data) {
  if (data) {
    var anno = data.substring(0, 4);
    var mese = data.substring(5, 7);
    var giorno = data.substring(8, 10);
    var oggetto_data = new Date(anno, mese, giorno);
    var data_attuale = new Date();
    var diff = Math.abs(data_attuale - oggetto_data) / (1000 * 60 * 60 * 24);
    var diff = Math.round(diff);
    var anni_diff = "";
    var mesi_diff = "";

    if (diff < 30) {
      return "meno di un mese";
    } else if (diff > 364) {
      anni_diff = Math.round(diff / 365);
      diff = diff - anni_diff * 365;
      mesi_diff = Math.round(diff / 30);
      if (anni_diff > 1) {
        if (mesi_diff > 1) {
          return anni_diff + " anni e " + mesi_diff + " mesi";
        } else if (mesi_diff > 0) {
          return anni_diff + " anni e 1 mese";
        } else {
          return anni_diff + " anni";
        }
      } else {
        if (mesi_diff > 1) {
          return anni_diff + " anno e " + mesi_diff + " mesi";
        } else if (mesi_diff > 0) {
          return anni_diff + " anno e 1 mese";
        } else {
          return anni_diff + " anno";
        }
      }
    } else {
      mesi_diff = Math.round(diff / 30);
      if (mesi_diff > 1) {
        return mesi_diff + " mesi";
      } else if (mesi_diff > 0) {
        return "1 mese";
      }
    }
  }
}

export function calculateHeight() {
  var off = $("#rowcontainer") ? $("#rowcontainer").offset() : { top: 0 };
  var hwin = $(window).height();
  $("#rowcontainer") && $("#rowcontainer").css("height", hwin - off.top - 30);
}

export function setTooltip(testo) {
  return (
    <span
      title={testo}
      style={{ padding: "0px" }}
      className="text-truncate text-left d-block mw-100"
    >
      {testo && testo.length > 20 ? testo.substring(0, 20) + "..." : testo}
    </span>
  );
}

export function createRequestValue(vals) {
  var request = { id: vals.id };
  for (var attr in vals) {
    if (vals[attr]) {
      if (vals[attr].label) {
        request[attr] = vals[attr].value;
      } else {
        request[attr] = vals[attr];
      }
    } else {
      request[attr] = undefined;
    }
  }
  return request;
}

export function createRequestArray(vals) {
  var request = { id: vals.id };
  for (var attr in vals) {
    if (vals[attr]) {
      if (Array.isArray(vals[attr]))
        request[attr] = vals[attr].map((single) => single.value || single.id);
      else if (vals[attr].label) {
        request[attr] = vals[attr].value;
      } else {
        request[attr] = vals[attr];
      }
    } else {
      request[attr] = undefined;
    }
  }
  return request;
}

export function adaptMany2Many(vals, key) {
  let res = [];
  if (vals[key]) {
    res = [
      [
        6,
        0,
        vals[key].map((el) => {
          return el.value || el.id;
        }),
      ],
    ];
  }
  return res;
}

export function createRequestVals(
  vals = {},
  keys = [],
  m2mAttrs = [],
  m2oAttrs = [],
  binaryAttrs = []
) {
  // vals any = vals non trattato di partenza
  // keys string[] = chiavi modificate
  // m2mAttrs string[] = lista dei field many2many
  // m2oAttrs string[] = lista dei field many2one
  // binaryAttrs string[] = lista dei field binary

  // requestVals = vals trattato per essere inviato alla request
  let requestVals = {};
  for (let attr of keys) {
    requestVals[attr] = vals[attr];
  }
  for (let attr of m2mAttrs) {
    if (requestVals[attr]) {
      requestVals[attr] = adaptMany2Many(requestVals, attr);
    }
  }
  for (let attr of m2oAttrs) {
    if (requestVals[attr]) {
      requestVals[attr] = requestVals[attr].id;
    }
  }
  for (let attr of binaryAttrs) {
    if (requestVals[attr]) {
      if (requestVals[attr].indexOf("data:image/*;base64,") > -1) {
        requestVals[attr] = requestVals[attr].replace(
          "data:image/*;base64,",
          ""
        );
      } else {
        delete requestVals[attr];
      }
    }
  }
  if (keys.includes("domain_id")) {
    if (
      requestVals.domain_id &&
      Object.keys(requestVals.domain_id).length > 0
    ) {
      requestVals["domain_id"] = adaptConditionDomainVals(
        requestVals["domain_id"]
      );
    } else {
      requestVals["domain_id"] = false;
    }
  }

  if (keys.includes("conditions_domain_id")) {
    if (
      requestVals.conditions_domain_id &&
      Object.keys(requestVals.conditions_domain_id).length > 0
    ) {
      requestVals["conditions_domain_id"] = adaptConditionDomainVals(
        requestVals["conditions_domain_id"]
      );
    } else {
      requestVals["conditions_domain_id"] = false;
    }
  }

  if (keys.includes("actions_domain_id")) {
    if (
      requestVals.actions_domain_id &&
      Object.keys(requestVals.actions_domain_id).length > 0
    ) {
      requestVals["actions_domain_id"] = adaptConditionDomainVals(
        requestVals["actions_domain_id"]
      );
    } else {
      requestVals["actions_domain_id"] = false;
    }
  }
  return requestVals;
}

export function adaptConditionDomainVals(domainVals) {
  let vals = {};
  let childs = [];

  for (let attr in domainVals) {
    if (domainVals[attr]) {
      if (attr === "attribute_id") {
        vals[attr] = domainVals["attribute_id"].id;
      } else {
        if (attr !== "parent_id" && attr !== "odoo_domain")
          vals[attr] = domainVals[attr];
      }
    }
  }

  if (vals.child_ids) {
    for (let child of vals.child_ids) {
      childs.push(adaptConditionDomainVals(child));
    }
  }

  vals["child_ids"] = childs;

  return vals;
}

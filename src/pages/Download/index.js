import React, { useState, useEffect, Fragment } from "react";

import api from "../../services/api";

export default function Download(props) {
  const [path, setPath] = useState("");

  function submit(e) {
    e.preventDefault();
    api
      .get(`download/${path}`)
      // .then(response => response.blob())
      // .then(blob => {
      .then(response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "planilhademenda.xlsx";
          a.click();
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <Fragment>
      <form onSubmit={submit}>
        <label>
          <input
            value={path}
            type="text"
            onChange={e => setPath(e.target.value)}
          />{" "}
          Digite o id do arquivo que deseja baixar
        </label>
        <button type="submit">BAIXAR</button>
      </form>
    </Fragment>
  );
}

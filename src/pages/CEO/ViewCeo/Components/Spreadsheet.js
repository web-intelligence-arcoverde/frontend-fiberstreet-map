import React, { useState, useEffect, useCallback } from "react";

import { Container, Col, Form, Button } from "react-bootstrap";
import UploadFile from "../../../../components/UploadFile";
import FileSpreadsheet from "../../../../components/FileSpreadsheet";
import { Link } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import store from '../../../../redux/store'

import api from "../../../../services/api";
import usedUrl from "../../../../services/api";

//Creators redux
// import { Creators as CeoActions } from "../../../../redux/store/ducks/ceo";
import { Creators as CeoActions } from "~/redux/store/ducks/ceo";

export default function Spreadsheet(props) {
  const [name, setName] = useState("");

  const [currentFile, setCurrentFile] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [spreadsheetURL, setSpreadsheetURL] = useState(null);
  const [p_slug, setP_slug] = useState(null);

  const viewCeoData = useSelector(state => state.ceo.viewCeo.data);
  const dispatch = useDispatch();

  const { data, visible } = useSelector(state => state.ceo.viewCeo);
  // useEffect(() => {
  //   if (visible) {
  //     api
  //       .get(`spreadsheets/ceo/${data.id}`)
  //       .then(response => {
  //         setSpreadsheet(response.data);
  //         setSpreadsheetURL(response.data.url);
  //       })
  //       .catch(err => console.warn(err));
  //   }
  // }, [data.id, visible]);

  const deleted = useCallback(() => {
    api.delete(`spreadsheets/:${data.id}`);
  }, [data.id]);

  // const download = useCallback(() => {
  //   // api.get(`spreadsheets/:${data.id}`);
  //   api.get(spreadsheetURL);
  // }, [spreadsheetURL]);

  function download() {
    api
      .get(spreadsheetURL)
      .then(response => {})
      .catch(err => {
        console.error(err);
      });
  }

  function deleteSpreadsheet(id) {
    api
      .delete(`spreadsheets/${id}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentFile) {
      api
        .post("spreadsheets", formData, {
          onUploadProgress: e => {
            const progress = parseInt(Math.round((e.loaded * 100) / e.total));
            console.log(progress);
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => console.log(err));
    }
  }

  function updateFile(id, data) {}

  function handleUpload(files) {
    setCurrentFile(files[0]);
    const currentFile = files[0];
    const data = new FormData();
    data.append("file", currentFile, currentFile.name);
    data.append("ceo_id", viewCeoData.id);
    setFormData(data);
  }

  function handleButtonUpdate() {}

  // Obter link para download da planilha com plano de emenda
  useEffect(() => {
    if (visible) {

      const { active: provider } = store.getState().provider;
      const { slug } = provider
      setP_slug(slug)

      api
        .get(`spreadsheetlinks/${data.id}`)
        .then(response => {
          setSpreadsheetURL(response.data.sublink);
        })
        .catch(err => {
          api
            .post("spreadsheetlinks", {
              ceo_id: data.id
            })
            .then(response => {
              setSpreadsheetURL(response.data.sublink);
            })
            .catch(err => {
              console.warn(err);
            });
        });
      
      
    }
  }, [data.id, visible]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            required
            minLength="5"
            maxLength="150"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <UploadFile onUpload={handleUpload} />
          {currentFile && <FileSpreadsheet file={currentFile} />}
          <Button type="submit" variant="info" style={{ margin: "10px" }}>
            Atualizar
          </Button>

          {spreadsheetURL && (
            <a
              href={`http://192.168.11.104:3333/spreadsheets/${spreadsheetURL}/${p_slug}`}
              target="_blank"
            >
              <Button
                // onClick={download}
                variant="info"
                style={{ margin: "10px" }}
              >
                Download
              </Button>
            </a>
          )}

          {spreadsheetURL && (
            <Button
              onClick={deleted}
              variant="danger"
              style={{ margin: "10px" }}
            >
              Deletar
            </Button>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
}

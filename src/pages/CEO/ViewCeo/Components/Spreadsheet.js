import React, { useState, useEffect, useCallback } from 'react';

import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import FileSpreadsheet from '../../../../components/FileSpreadsheet';
import UploadFile from '../../../../components/UploadFile';
import store from '../../../../redux/store';

import api, { endPoint } from '../../../../services/api';
import usedUrl from '../../../../services/api';

// Creators redux
// import { Creators as CeoActions } from "../../../../redux/store/ducks/ceo";
import { Creators as CeoActions } from '~/redux/store/ducks/ceo';

export default function Spreadsheet(props) {
  const [name, setName] = useState('');

  const [currentFile, setCurrentFile] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [spreadsheetURL, setSpreadsheetURL] = useState(null);
  const [p_slug, setP_slug] = useState(null);

  const viewCeoData = useSelector(state => state.ceo.viewCeo.data);
  const dispatch = useDispatch();

  const { data, visible } = useSelector(state => state.ceo.viewCeo);

  const deleted = useCallback(() => {
    api.delete(`spreadsheets/ceo/${data.id}`);
    dispatch(CeoActions.hideViewModalCeo());
  }, [data.id, dispatch]);

  function deleteSpreadsheet() {
    api.delete(`spreadsheets/${data.id}`);
  }

  function download() {
    api
      .get(spreadsheetURL)
      .then(response => {})
      .catch(err => {
        console.error(err);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentFile) {
      if (!spreadsheetURL) {
        api
          .post('spreadsheets', formData, {
            onUploadProgress: e => {
              const progress = parseInt(Math.round((e.loaded * 100) / e.total));
              console.log(progress);
            },
          })
          .then(response => {
            toastr.success(
              'Plano de emenda',
              'Plano de emenda salvo com sucesso'
            );
          })
          .catch(err => console.log(err));
      } else {
        api
          .put(`spreadsheets/ceo/${data.id}`, formData, {
            onUploadProgress: e => {
              const progress = parseInt(Math.round((e.loaded * 100) / e.total));
              console.log(progress);
            },
          })
          .then(response => {
            toastr.success(
              'Plano de emenda',
              'Plano de emenda salvo com sucesso'
            );
          })
          .catch(err => console.log(err));
      }

      dispatch(CeoActions.hideViewModalCeo());
    }
  }

  function updateFile(id, data) {}

  function handleUpload(files) {
    setCurrentFile(files[0]);
    const currentFile = files[0];
    const data = new FormData();
    data.append('file', currentFile, currentFile.name);
    data.append('ceo_id', viewCeoData.id);
    setFormData(data);
  }

  function handleButtonUpdate() {}

  // Obter link para download da planilha com plano de emenda
  useEffect(() => {
    if (visible) {
      const { active: provider } = store.getState().provider;
      const { slug } = provider;
      setP_slug(slug);

      api
        .post('spreadsheetlinks', {
          ceo_id: data.id,
        })
        .then(response => {
          setSpreadsheetURL(response.data.sublink);
        })
        .catch(err => {
          console.warn(err);
        });
      // api
      //   .get(`spreadsheetlinks/${data.id}`)
      //   .then(response => {
      //     setSpreadsheetURL(response.data.sublink);
      //   })
      //   .catch(err => {});
    }
  }, [data.id, visible]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <UploadFile onUpload={handleUpload} />
          {currentFile && <FileSpreadsheet file={currentFile} />}
          <Button type="submit" variant="info" style={{ margin: '10px' }}>
            Atualizar
          </Button>

          {spreadsheetURL && (
            <a
              href={`${endPoint}/spreadsheets/${spreadsheetURL}/${p_slug}`}
              target="_blank"
            >
              <Button variant="info" style={{ margin: '10px' }}>
                Download
              </Button>
            </a>
          )}

          {spreadsheetURL && (
            <Button
              onClick={deleted}
              variant="danger"
              style={{ margin: '10px' }}
            >
              Deletar
            </Button>
          )}
        </div>
      </form>
    </Container>
  );
}

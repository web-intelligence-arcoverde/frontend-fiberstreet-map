import React, { Fragment } from "react";
import { Container } from "./styles";
import Axios from "axios";
import qs from "querystring";
//import { obterDadosDoServidor } from '../../services/handleInformation'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../redux/store/actions/all";
import testApi from "../../services/api";

function Home(props) {
  const api = Axios.create({
    baseURL: "https://api.twilio.com/2010-04-01/",
    Authorization:
      "Basic ACc76ed40b6ce2597fadf5202d35d2eede 9bd2615801b42605529d0fba10e479df"
  });

  const { mapa } = props.redux;
  const { setCtoFromServer } = props;

  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const auth = {
    auth: {
      username: "ACc76ed40b6ce2597fadf5202d35d2eede",
      password: "9bd2615801b42605529d0fba10e479df"
    }
  };

  const body = "O seu código é 12512";

  const requestBody = {
    To: `+5587991520316`,
    From: `+12097818037`,
    Body: `${body}`
  };

  const sendMessage = () => {
    api
      .post(
        `Accounts/ACc76ed40b6ce2597fadf5202d35d2eede/Messages.json`,
        qs.stringify(requestBody),
        config,
        auth
      )
      .then(result => console.warn(result))
      .catch(err => console.warn(err));
  };

  const obterDadosDoServidor = type => {
    let information = {
      type: type
    };

    var dados;

    testApi
      .post(`/get/${type}`, information)
      .then(result => {
        var data = result.data;
        dados = data;
        setCtoFromServer(dados);
      })
      .catch(err => {
        console.warn(err);
      });
    return dados;
  };

  return (
    <Container>
      <Fragment>
        <button onClick={sendMessage}>AAA</button>
        <button onClick={() => alert(obterDadosDoServidor("cto"))}>
          CTO DO DATABASE
        </button>
        <button onClick={() => alert(console.warn(mapa))}>QUale</button>
        <p />
      </Fragment>
    </Container>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const mapStateToProps = state => ({
  redux: state
});

export default connect(
  mapDispatchToProps,
  mapStateToProps
)(Home);

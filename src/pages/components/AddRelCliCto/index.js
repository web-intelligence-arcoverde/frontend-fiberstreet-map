import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Container, ConnectionView, IconOutSp, OutView } from "./styles";
import "./styles.css";

Modal.setAppElement(document.getElementById("root"));

function AddRelCliCto(props) {
  const [saidas, setSaidas] = useState("");

  function handleHideModal() {}
  function getCliById() {}
  function getSpById() {}

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleHideModal}
      contentLabel="Fibra + Splitter"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <Container>
        <h3>Clique onde o drop irá ficar</h3>
        <ConnectionView>
          <div>DROP</div>
          <div>
            <OutView>
              <span>1</span>
              <IconOutSp active onClick={() => alert('Fica verde')} />
            </OutView>
            <OutView>
              <span>2</span>
              <IconOutSp inactive />
            </OutView>
            <OutView>
              <span>3</span>
              <IconOutSp active />
            </OutView>
            <OutView>
              <span>4</span>
              <IconOutSp inaactive />
            </OutView>

            {/* {saidas.map((sp, index) => {
              // <IconOutSp
              //   splitterNumberOut={saidaSplitter.numbers}
              //   cliente={getCliById(sp.cliente_cod_cli)}
              //   splitter={getSpById(sp.splitter_cod)}
              // />;
            })} */}
          </div>
        </ConnectionView>
      </Container>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

// const mapDispatchToProps = dispatch => bindActionCreators()

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(AddRelCliCto);

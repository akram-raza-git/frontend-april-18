import React, { Component } from "react";

import { Modal } from "react-bootstrap";

class PopupModal extends Component {
  render() {
    const { closeButton } = this.props;
    return (
      <Modal
        dialogClassName={this.props.custClassName}
        backdropClassName={
          this.props.backdropClassName ? this.props.backdropClassName : null
        }
        show={this.props.showModal}
        onHide={this.props.onCloseFunc}
        id={this.props.id}
        backdrop={this.props.backdrop || true}
        bsSize={this.props.bsSize}
      >
        <Modal.Header closeButton={closeButton}>
          <Modal.Title>{this.props.headerText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        {this.props.modelFooter && (
          <Modal.Footer>{this.props.modelFooter}</Modal.Footer>
        )}
      </Modal>
    );
  }
}

export default PopupModal;

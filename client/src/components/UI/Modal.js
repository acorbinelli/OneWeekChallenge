import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import classes from "./Modal.module.css"

const Backdrop = (props) => {
  return (
    <Fragment>
      <div className={classes.backdrop} onClick={props.action} />
    </Fragment>
  )
}
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className='classes content'>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById("overlays")

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop action={props.action} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay> {props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  )
}

export default Modal

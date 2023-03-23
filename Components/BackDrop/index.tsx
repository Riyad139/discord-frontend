import { Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function BackDrop(props: {
  open: boolean;
  handleClose: any;
  Children: any;
}) {
  return (
    <Modal
      className="flex justify-center items-center"
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {props.Children}
    </Modal>
  );
}

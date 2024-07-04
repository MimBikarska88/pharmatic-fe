import { useModalStore } from "../../stores/modalStore";
import PDButton from "../PDButton/PDButton";

const Modal = () => {
  const {
    show,
    modalTitle,
    modalText,
    onClose,
    onCancel,
    showCancel,
    hideModal,
  } = useModalStore((state) => state);
  return (
    <>
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden={!show}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="text-center modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
            </div>
            <div className="modal-body">
              <p>{modalText}</p>
            </div>
            <div className="modal-footer">
              <PDButton
                color={"green"}
                onClick={onClose || hideModal}
                style={{ width: "5rem" }}
                value={"Close"}
              />
              {showCancel && (
                <PDButton
                  color={"purple"}
                  style={{ width: "5rem" }}
                  onClick={onCancel}
                  value={"Ok"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;

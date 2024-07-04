import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// each page is a nested object that contains validation states for fields
const initialStore = {
  show: false,
  modalTitle: "",
  modalText: "",
  onClose: null,
  onCancel: null,
  showCancel: false,
};

export const useModalStore = create(
  immer((set) => ({
    ...initialStore,

    hideModal: () =>
      set((state) => {
        state.show = false;
      }),
    showModal: () =>
      set((state) => {
        state.show = true;
      }),
    setModalTitle: (value) =>
      set((state) => {
        state.title = value;
      }),
    setModalText: (value) =>
      set((state) => {
        state.modalText = value;
      }),
    setModalCloseFunction: (func = () => {}) =>
      set((state) => {
        if (typeof func === "function") {
          state.onClose = func;
        }
      }),
    setModalCancelFunction: (func = () => {}) =>
      set((state) => {
        if (typeof func === "function") {
          state.onCancel = func;
        }
      }),
    setModal: (modal) =>
      set((state) => {
        Object.keys(modal).forEach((key) => {
          state[key] = modal[key];
        });
      }),
  }))
);

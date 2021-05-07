import classNames from "classnames"
import { MouseEventHandler } from "react"

export interface ModalProps {
  title?: string
  body?: string
  isActive: Boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}

export function Modal({ title, body, onClose, isActive }: ModalProps) {
  return (
    <div
      className={classNames(
        `modal modal-active fixed w-full h-full top-0 left-0 flex items-center justify-center`,
        {
          "opacity-0": !isActive,
          "pointer-events-none": !isActive,
          "modal-active": isActive,
        }
      )}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{title}</p>
          </div>

          <p>{body}</p>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="modal-close px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-indigo-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

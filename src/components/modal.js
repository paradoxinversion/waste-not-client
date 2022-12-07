import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide, children }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div className="fixed inset-0 z-10" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className='min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='p-4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
              <div className="modal-header">
              <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                  <span aria-hidden="true">&times;</span>
              </button>
              </div>
              {children}
          </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;
export default Modal;
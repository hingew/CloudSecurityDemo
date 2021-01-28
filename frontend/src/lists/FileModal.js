import React from 'react'
import Button from '../common/button'
import Modal from '../common/modal'
import Dropzone from 'react-dropzone'

const FileModal = ({ open, close, onSubmit }) => {
  if (!open) {
    return null
  }

  return (
    <Modal>
      <Modal.Backdrop close={close}>
        <div className='mt-3 text-center sm:mt-5'>
          <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
            FileUpload
          </h3>
        </div>
        <Dropzone maxFiles={1} onDrop={acceptedFiles => onSubmit(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className='h-64 w-full border-gray-400 border-2 border-dashed rounded-lg'>
              <div {...getRootProps()} className='flex flex-col items-center justify-center h-full'>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </Modal.Backdrop>
    </Modal>
  )
}

FileModal.defaultProps = {
  open: false,
  close: () => null,
  onSubmit: () => null
}

export default FileModal

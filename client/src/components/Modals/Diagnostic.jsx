import { useState } from 'react'
import { AddDiagnosticAxios } from '../../api/vet'
import { mutate } from 'swr'


export const AddDiagnostic = ({ id }) => {
  const [showModal, setShowModal] = useState(false)


  

  return (
    <>

      {showModal
        ? (
          <>

          </>
          )
        : null}
    </>
  )
}

import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { finishAppointement } from '../../api/vet'
import { mutate } from 'swr'

export const ResolveDiagnostic = ({ id }) => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = async () => {
    mutate('/citas/activos', async () => {
      await finishAppointement(id)
      setShowModal(false)
    })
  }

  return (
    <>

      {showModal
        ? (
<p>asaaa</p>
          )
        : null}
    </>
  )
}

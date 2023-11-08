import React, { useEffect } from 'react'

const ClientsList = () => {
    useEffect(() => {
      axios
          .get(
              `https://dispex.org/api/vtest/HousingStock/clients?addressId=${addressId}`
          )
          .then((result) => {})
    
      return () => {
        second
      }
    }, [third])
    
  return (
    <div>ClientsList</div>
  )
}

export default ClientsList
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export interface ApartmentType {
    flat: string
    corpus?: string
    building: string
    addressId: number
}

export interface ApartmentListType {
    streetId: number
    houseId: number
    houseCorp?: string
    houseNumber: string
}

const AparatmentsList = ({
    streetId,
    houseId,
    houseCorp,
    houseNumber
}: ApartmentListType) => {
    const [apartments, setApartments] = useState<ApartmentType[]>()
    const [showClients, setShowClients] = useState(false)
    useEffect(() => {
        axios
            .get(
                `https://dispex.org/api/vtest/HousingStock?streetId=${streetId}&houseId=${houseId}`
            )
            .then((result) => {
                // console.log(houseCorp)
                const aparts = result.data.filter((obj: ApartmentType) => {
                    return houseCorp
                        ? obj.building === houseNumber &&
                              obj.corpus === houseCorp
                        : obj.building === houseNumber &&
                              !Object.prototype.hasOwnProperty.call(
                                  obj,
                                  'corpus'
                              )
                })
                setApartments(aparts)
            })
    }, [])
    if (!apartments) return <div>Loading...</div>

    const apartList = apartments.map((apart, index) => (
        <div key={index} className="bg-yellow-700 pl-4 hover:bg-yellow-300">
            Кваритра: {apart.flat} Дом: {apart.building}{' '}
            {apart.corpus && <>Корпус {apart.corpus}</>} Адрес айди:{' '}
            {apart.addressId}
        </div>
    ))

    return <div>{apartList}</div>
}

export default AparatmentsList

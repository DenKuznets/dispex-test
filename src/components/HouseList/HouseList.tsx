import axios from 'axios'
import AparatmentsList from 'components/AparatmentsList/AparatmentsList'
import { StreetType } from 'components/StreetList/StreetList'
import { useEffect, useState } from 'react'

export interface HouseType {
    id: number
    name: string
}

const HouseList = ({ street }: { street: StreetType }) => {
    const [houseList, setHouseList] = useState<HouseType[]>([])
    useEffect(() => {
        if (street) {
            axios
                .get(`https://dispex.org/api/vtest/Request/houses/${street.id}`)
                .then((result) => {
                    setHouseList(result.data)
                })
        }
    }, [street])

    const houses = houseList.map((house) => {
        const [houseNumber, houseCorp] = house.name.split('к')

        return (
            <details
                key={house.id}
                className="bg-red-600 pl-4 hover:bg-red-400"
            >
                <summary>Дом : {house.name}</summary>
                <div>
                    <AparatmentsList
                        streetId={street.id}
                        houseId={house.id}
                        houseCorp={houseCorp}
                        houseNumber={houseNumber}
                    />
                </div>
            </details>
        )
    })

    return <div>{houses}</div>
}

export default HouseList

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
                    console.log('houses', result.data)
                    setHouseList(result.data)
                })
        }
    }, [street])

    const houses = houseList.map((house) => {
        // console.log('house info', houseInfo)
        const [houseNumber, houseCorp] = house.name.split('к')

        console.log('house info', houseNumber, houseCorp)
        return (
            <details key={house.id}>
                <summary>Дом : {house.name}</summary>
                <div className="bg-yellow-700 pl-4">
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

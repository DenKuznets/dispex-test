import axios from 'axios'
import { useEffect, useState } from 'react'

interface StreetType {
    nameWithPrefix: string
    id: number
    houses: HouseType[]
}

interface HouseType {
    id: number
    name: string
}

const TreeList = () => {
    const [streets, setStreets] = useState<StreetType[]>()
    useEffect(() => {
        axios
            .get('https://dispex.org/api/vtest/Request/streets')
            .then((result) => {
                console.log('streets', result.data)
                setStreets(result.data)
            })
    }, [])

    useEffect(() => {
        if (streets) {
            streets.forEach((street) => {
                axios
                    .get(
                        `https://dispex.org/api/vtest/Request/houses/${street.id}`
                    )
                    .then((result) => {
                        console.log('houses', result.data)
                        street.houses = result.data
                    })
            })
        }
    }, [streets])

    if (!streets) return <div>Loading...</div>
    const streetList = streets.map((street) => {
        let houseList
        if (street.houses) {
            houseList = street.houses.map((house) => {
                return (
                    <div key={house.id}>
                        <div>{house.name}</div>
                    </div>
                )
            })
        }
        return (
            <div className="bg-purple-500" key={street.nameWithPrefix}>
                <div>{street.nameWithPrefix}</div>
                <div>{houseList}</div>
            </div>
        )
    })
    return <div>{streetList}</div>
}

export default TreeList

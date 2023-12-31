import axios from 'axios'
import HouseList from 'components/HouseList/HouseList'
import { useEffect, useState } from 'react'

export interface StreetType {
    nameWithPrefix: string
    id: number
}

const StreetList = () => {
    const [streets, setStreets] = useState<StreetType[]>()
    useEffect(() => {
        axios
            .get('https://dispex.org/api/vtest/Request/streets')
            .then((result) => {
                setStreets(result.data)
            })
    }, [])

    if (!streets) return <div>Loading...</div>
    const streetList = streets.map((street) => {
        return (
            <details
                className="cursor-pointer bg-purple-500 p-2 hover:bg-purple-300"
                key={street.nameWithPrefix}
            >
                <summary>{street.nameWithPrefix}</summary>
                <div>
                    <HouseList street={street} />
                </div>
            </details>
        )
    })
    return <div>{streetList}</div>
}

export default StreetList

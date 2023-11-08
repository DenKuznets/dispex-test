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
                console.log('streets', result.data)
                setStreets(result.data)
            })
    }, [])

    if (!streets) return <div>Loading...</div>
    const streetList = streets.map((street) => {
        return (
            <div className="bg-purple-500" key={street.nameWithPrefix}>
                <div>{street.nameWithPrefix}</div>
                <div className="bg-red-600 pl-4">
                    <HouseList street={street} />
                </div>
            </div>
        )
    })
    return <div>{streetList}</div>
}

export default StreetList

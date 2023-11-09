import axios from 'axios';
import ClientsList, { ClientType } from 'components/ClientsList/ClientsList';
import React, { useEffect, useState } from 'react';

export interface ApartmentType {
    flat: string;
    corpus?: string;
    building: string;
    addressId: number;
    clients: ClientType[];
}

export interface ApartmentListType {
    streetId: number;
    houseId: number;
    houseCorp?: string;
    houseNumber: string;
}

const Apartment = ({ apartment }: { apartment: ApartmentType }) => {
    const [showClients, setShowClients] = useState(false);
    return (
        <div
            onClick={() => {
                setShowClients(true);
            }}
            className="bg-yellow-700 pl-4 hover:bg-yellow-300"
        >
            Кваритра: {apartment.flat} Дом: {apartment.building}{' '}
            {apartment.corpus && <>Корпус {apartment.corpus}</>} Адрес айди:{' '}
            {apartment.addressId}
            {showClients && (
                <ClientsList
                    addressId={apartment.addressId}
                    clients={apartment.clients}
                />
            )}
        </div>
    );
};

const AparatmentsList = ({
    streetId,
    houseId,
    houseCorp,
    houseNumber
}: ApartmentListType) => {
    const [apartments, setApartments] = useState<ApartmentType[]>();

    useEffect(() => {
        axios
            .get(
                `https://dispex.org/api/vtest/HousingStock?streetId=${streetId}&houseId=${houseId}`
            )
            .then((result) => {
                const aparts = result.data.filter((obj: ApartmentType) => {
                    return houseCorp
                        ? obj.building === houseNumber &&
                              obj.corpus === houseCorp
                        : obj.building === houseNumber &&
                              !Object.prototype.hasOwnProperty.call(
                                  obj,
                                  'corpus'
                              );
                });
                setApartments(aparts);
            });
    }, [houseCorp, houseNumber, houseId, streetId]);

    if (!apartments) return <div>Loading...</div>;

    const apartList = apartments.map((apart, index) => (
        <Apartment apartment={apart} key={index} />
    ));

    return <div>{apartList}</div>;
};

export default AparatmentsList;

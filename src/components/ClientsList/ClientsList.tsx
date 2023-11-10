import axios from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export interface ClientType {
    Name: string;
    Phone: string;
    Email: string;
    id?: number;
}

interface FormValues {
    name: string;
    phone: string;
    email: string;
}

const ClientsList = ({
    clients,
    addressId
}: {
    addressId: number;
    clients: ClientType[];
}) => {
    const [addedClients, setAddedClients] = useState<ClientType[]>(clients);
    const { formState, register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            name: '',
            email: '',
            phone: ''
        }
    });
    const { errors } = formState;
    const deleteClient = (id: number) => {
        axios
            .delete(
                `https://dispex.org/api/vtest/HousingStock/bind_client/${id}`
            )
            .then((result) => {
                if (result.status === 200) {
                    setAddedClients(
                        addedClients.filter((client) => client.id !== id)
                    );
                }
            });
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('submit', data);
        axios
            .post('https://dispex.org/api/vtest/HousingStock/client', {
                Name: data.name,
                Phone: data.phone,
                Email: data.email
            })
            .then((result) => {
                if (result.data.result === 'Ok') {
                    const clientId = result.data.id;
                    axios
                        .put(
                            'https://dispex.org/api/vtest/HousingStock/bind_client',
                            {
                                AddressId: addressId,
                                ClientId: clientId
                            }
                        )
                        .then((result) => {
                            if (result.status === 200) {
                                setAddedClients((prev) => [
                                    ...prev,
                                    {
                                        Name: data.name,
                                        Phone: data.phone,
                                        Email: data.email,
                                        id: clientId
                                    }
                                ]);
                            }
                        });
                }
            });
    };

    const cliList =
        addedClients.length > 0 ? (
            addedClients.map((client, index) => {
                return (
                    <div key={index} className="flex max-w-xs flex-col gap-2">
                        <div>{client.Name}</div>
                        <div>{client.Phone}</div>
                        <div>{client.Email}</div>
                        <button
                            className="bg-red-500 p-2"
                            onClick={() => client.id && deleteClient(client.id)}
                        >
                            Удалить
                        </button>
                    </div>
                );
            })
        ) : (
            <div>В квартире жильцов нет</div>
        );
    return (
        <div className="fixed left-1/2 top-1/2 flex min-h-[70vh] min-w-[70vw] -translate-x-1/2 -translate-y-1/2 cursor-default flex-col rounded-lg bg-gray-200 p-10">
            <div className="flex flex-wrap gap-4">{cliList}</div>
            <div className="absolute bottom-0 left-0 w-full bg-gray-400 px-4 py-6">
                <form
                    noValidate
                    aria-label="personal info form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col flex-wrap items-center justify-start gap-4  lg:flex-row"
                >
                    <div className="relative">
                        <p className="absolute left-[32px] top-[-21px] text-[0.75rem] text-red-800">
                            {errors.name?.message}
                        </p>
                        <label htmlFor="name"> Имя</label>
                        <input
                            autoFocus
                            id="name"
                            className={`min-w-0 rounded p-2  ${
                                errors.name ? 'bg-red-200 outline-red-600' : ''
                            }`}
                            placeholder="Иван"
                            type="text"
                            {...register(`name`, {
                                required: 'Это поле необходимо заполнить'
                            })}
                        />
                    </div>
                    <div className="relative">
                        <p className="absolute left-[62px] top-[-21px] text-[0.75rem] text-red-800">
                            {errors.name?.message}
                        </p>
                        <label htmlFor="phone"> Телефон</label>

                        <input
                            id="phone"
                            className={`min-w-0 rounded p-2  ${
                                errors.phone ? 'bg-red-200 outline-red-600' : ''
                            }`}
                            placeholder="+7"
                            type="text"
                            {...register(`phone`, {
                                required: 'This field is required',
                                pattern: {
                                    value: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/g,
                                    message: 'Invalid email'
                                }
                            })}
                        />
                    </div>
                    <div className="relative">
                        <p className="absolute left-[43px] top-[-21px] text-[0.75rem] text-red-800">
                            {errors.name?.message}
                        </p>
                        <label htmlFor="email"> Почта</label>
                        <input
                            id="email"
                            className={`min-w-0 rounded p-2  ${
                                errors.email ? 'bg-red-200 outline-red-600' : ''
                            }`}
                            placeholder="example@test.ru"
                            type="text"
                            {...register(`email`, {
                                required: 'This field is required',
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: 'Invalid email'
                                }
                            })}
                        />
                    </div>
                    <button className=" rounded bg-amber-500 p-2 hover:bg-amber-300 active:scale-95">
                        Добавить жильца
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClientsList;

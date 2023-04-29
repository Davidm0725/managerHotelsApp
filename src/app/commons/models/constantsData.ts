export let hotels: IHotel[] = [];

interface IHotel {
    id: string,
    name: string,
    country: string,
    location: string,
    phone: string,
    email: string,
    status: string,
    bookings?: [],
    rooms: IRoom[]
}

interface IRoom {
    id: number,
    room: number,
    basisCost: number,
    typeRoom: string,
    taxes: number,
    status: string
}
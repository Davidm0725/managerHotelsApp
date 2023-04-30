export let hotels: IHotel[] = [];

interface IHotel {
    id: string,
    name: string,
    country: string,
    location: string,
    phone: string,
    email: string,
    status: string,
    bookings?: IBooking[],
    rooms: IRoom[]
}

interface IRoom {
    id: string,
    room: number,
    basisCost: number,
    typeRoom: string,
    taxes: number,
    status: string
}

interface IBooking {
    id: string,
    room: number,
    nameGuest: string,
    basisCost: number,
    typeRoom: string,
    totalCost: number,
    status: string,
    checkin: Date,
    checkout: Date,
    dateBooking: Date
}
export interface Route {
  id: string;
  driverName: string;
  origin: string;
  destination: string;
  departureTime: string;
  price: number;
  availableSeats: number;
  date: string;
}

export interface Passenger {
  id: string;
  name: string;
  pickupLocation: string;
  rating?: number;
}

export interface Match {
  id: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  pickupLocation: string;
  routeId: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  origin: string;
  destination: string;
  passengers: string[];
  totalEarned: number;
  rating?: number;
}

export interface PassengerHistoryItem {
  id: string;
  date: string;
  origin: string;
  destination: string;
  driverName: string;
  price: number;
  rating?: number;
}

export const mockRoutes: Route[] = [
  {
    id: "1",
    driverName: "María González",
    origin: "San Isidro, Lima",
    destination: "Torre Empresarial, San Borja",
    departureTime: "08:30",
    price: 8,
    availableSeats: 3,
    date: "2024-12-20",
  },
  {
    id: "2",
    driverName: "Carlos Rodríguez",
    origin: "Miraflores, Lima",
    destination: "Centro Empresarial, Surco",
    departureTime: "07:45",
    price: 10,
    availableSeats: 2,
    date: "2024-12-20",
  },
  {
    id: "3",
    driverName: "Ana Martínez",
    origin: "La Molina, Lima",
    destination: "Oficinas Corporativas, San Isidro",
    departureTime: "09:00",
    price: 9,
    availableSeats: 4,
    date: "2024-12-20",
  },
  {
    id: "4",
    driverName: "Luis Fernández",
    origin: "Barranco, Lima",
    destination: "Plaza San Miguel",
    departureTime: "08:15",
    price: 7,
    availableSeats: 1,
    date: "2024-12-20",
  },
];

export const mockPassengers: Passenger[] = [
  {
    id: "p1",
    name: "Juan Pérez",
    pickupLocation: "Av. Javier Prado Este, San Isidro",
    rating: 4.8,
  },
  {
    id: "p2",
    name: "Laura Sánchez",
    pickupLocation: "Av. Arequipa, Miraflores",
    rating: 5.0,
  },
  {
    id: "p3",
    name: "Roberto Torres",
    pickupLocation: "Av. La Marina, San Miguel",
    rating: 4.5,
  },
];

export const mockDriverHistory: HistoryItem[] = [
  {
    id: "h1",
    date: "2024-12-15",
    origin: "San Isidro, Lima",
    destination: "Torre Empresarial, San Borja",
    passengers: ["Juan Pérez", "Laura Sánchez"],
    totalEarned: 16,
    rating: 4.8,
  },
  {
    id: "h2",
    date: "2024-12-10",
    origin: "Miraflores, Lima",
    destination: "Centro Empresarial, Surco",
    passengers: ["Roberto Torres"],
    totalEarned: 10,
    rating: 5.0,
  },
];

export const mockPassengerHistory: PassengerHistoryItem[] = [
  {
    id: "ph1",
    date: "2024-12-15",
    origin: "Av. Javier Prado Este, San Isidro",
    destination: "Torre Empresarial, San Borja",
    driverName: "María González",
    price: 8,
    rating: 5.0,
  },
  {
    id: "ph2",
    date: "2024-12-10",
    origin: "Av. Arequipa, Miraflores",
    destination: "Centro Empresarial, Surco",
    driverName: "Carlos Rodríguez",
    price: 10,
    rating: 4.5,
  },
];

export const getRouteById = (id: string): Route | undefined => {
  return mockRoutes.find((route) => route.id === id);
};

export const getPassengerById = (id: string): Passenger | undefined => {
  return mockPassengers.find((passenger) => passenger.id === id);
};


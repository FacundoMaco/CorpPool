export interface Route {
  id: string;
  driverName: string;
  origin: string;
  destination: string;
  departureTime: string;
  price: number;
  availableSeats: number;
  date: string;
  distanceKm?: number;
  durationMin?: number;
}

export interface Passenger {
  id: string;
  name: string;
  pickupLocation: string;
  rating?: number;
}

export interface Offer {
  id: string;
  passengerName: string;
  passengerRating: number;
  pickupLocation: string;
  destination: string;
  destinationDistrict: string;
  price: number;
  expiresIn: number;
  createdAt: number;
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
    origin: "Surco, Lima",
    destination: "Centro Empresarial San Isidro, Lima",
    departureTime: "08:30",
    price: 8,
    availableSeats: 3,
    date: "2024-12-20",
    distanceKm: 6.5,
    durationMin: 18,
  },
  {
    id: "2",
    driverName: "Carlos Rodríguez",
    origin: "Miraflores, Lima",
    destination: "Centro Empresarial San Isidro, Lima",
    departureTime: "07:45",
    price: 7,
    availableSeats: 2,
    date: "2024-12-20",
    distanceKm: 5.2,
    durationMin: 15,
  },
  {
    id: "3",
    driverName: "Ana Martínez",
    origin: "San Borja, Lima",
    destination: "Centro Empresarial San Isidro, Lima",
    departureTime: "09:00",
    price: 6,
    availableSeats: 4,
    date: "2024-12-20",
    distanceKm: 4.8,
    durationMin: 12,
  },
  {
    id: "4",
    driverName: "Luis Fernández",
    origin: "La Molina, Lima",
    destination: "Centro Empresarial San Isidro, Lima",
    departureTime: "08:15",
    price: 9,
    availableSeats: 1,
    date: "2024-12-20",
    distanceKm: 8.3,
    durationMin: 22,
  },
  {
    id: "5",
    driverName: "Patricia Silva",
    origin: "Centro Empresarial San Isidro, Lima",
    destination: "Surco, Lima",
    departureTime: "18:00",
    price: 8,
    availableSeats: 2,
    date: "2024-12-20",
    distanceKm: 6.5,
    durationMin: 20,
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

export interface DriverOffer {
  id: string;
  driverName: string;
  driverRating: number;
  origin: string;
  destination: string;
  price: number;
  availableSeats: number;
  departureTime: string;
  distanceKm: number;
  durationMin: number;
  vehicleInfo?: string;
}

export const generateMockOffers = (): Offer[] => {
  const districts = ["Surco", "San Isidro", "Miraflores", "San Borja", "La Molina"];
  const names = [
    "Juan Pérez", "Laura Sánchez", "Roberto Torres", "María González", "Carlos Rodríguez",
    "Ana Martínez", "Luis Fernández", "Patricia Silva", "Diego Morales", "Sofía Ramírez"
  ];
  const locations = [
    "Av. Javier Prado Este, San Isidro",
    "Av. Arequipa, Miraflores",
    "Av. La Marina, San Miguel",
    "Av. Camino Real, Surco",
    "Av. República de Panamá, San Isidro",
    "Av. Larco, Miraflores",
    "Av. Primavera, Surco",
    "Av. Angamos, San Borja",
    "Av. La Molina, La Molina",
    "Av. Benavides, Surco"
  ];
  
  const offers: Offer[] = [];
  const now = Date.now();
  
  districts.forEach((district, districtIndex) => {
    const count = district === "Surco" ? 3 : district === "San Isidro" ? 5 : district === "Miraflores" ? 2 : 1;
    
    for (let i = 0; i < count; i++) {
      const nameIndex = (districtIndex * 2 + i) % names.length;
      const locationIndex = (districtIndex * 2 + i) % locations.length;
      
      offers.push({
        id: `offer-${district}-${i}-${now}`,
        passengerName: names[nameIndex],
        passengerRating: 4.5 + Math.random() * 0.5,
        pickupLocation: locations[locationIndex],
        destination: `Centro Empresarial ${district}, Lima`,
        destinationDistrict: district,
        price: 5 + Math.floor(Math.random() * 3),
        expiresIn: 30 + Math.floor(Math.random() * 60),
        createdAt: now - Math.floor(Math.random() * 10) * 1000,
      });
    }
  });
  
  return offers.sort(() => Math.random() - 0.5);
};

export const calculateEarnings = (distanceKm: number, passengerCount: number): number => {
  const basePrice = distanceKm * 1.2;
  const passengerBonus = passengerCount * 0.5;
  const total = basePrice + passengerBonus;
  return Math.round(total * 2) / 2;
};

export const generateDriverOffers = (passengerDestination: string): DriverOffer[] => {
  const drivers = [
    { name: "María González", rating: 4.8, vehicle: "Toyota Corolla 2020" },
    { name: "Carlos Rodríguez", rating: 4.9, vehicle: "Honda Civic 2019" },
    { name: "Ana Martínez", rating: 4.7, vehicle: "Nissan Sentra 2021" },
    { name: "Luis Fernández", rating: 5.0, vehicle: "Hyundai Elantra 2020" },
    { name: "Patricia Silva", rating: 4.6, vehicle: "Mazda 3 2019" },
  ];

  const origins = ["Surco", "Miraflores", "San Borja", "La Molina", "San Isidro"];
  const distances = [4.5, 5.2, 6.8, 7.3, 8.1];
  const durations = [12, 15, 18, 20, 22];
  const prices = [6, 7, 8, 9, 10];

  return drivers.map((driver, index) => ({
    id: `driver-offer-${Date.now()}-${index}`,
    driverName: driver.name,
    driverRating: driver.rating,
    origin: origins[index % origins.length],
    destination: passengerDestination.includes("Centro Empresarial") 
      ? passengerDestination 
      : `Centro Empresarial ${passengerDestination}, Lima`,
    price: prices[index % prices.length],
    availableSeats: Math.floor(Math.random() * 3) + 1,
    departureTime: `${7 + index}:${index % 2 === 0 ? "30" : "45"}`,
    distanceKm: distances[index % distances.length],
    durationMin: durations[index % durations.length],
    vehicleInfo: driver.vehicle,
  }));
};


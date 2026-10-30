import { reactive } from 'vue'

// Estado compartilhado entre as telas (sem Pinia, o app é pequeno)
export const store = reactive({
  pickup: 'Shopping Frei Caneca',
  destination: 'MASP',
  stops: ['Rua Augusta, 1500', '', ''],
  schedule: null, // { date, time } quando o usuário agenda a viagem
  rideId: 'uberx',
  toast: '',
})

let toastTimer
export function showToast(msg) {
  store.toast = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (store.toast = ''), 2400)
}

export const recentPlaces = [
  { name: 'Casa', address: 'Rua Augusta, 1500 - Consolação, São Paulo - SP' },
  { name: 'Shopping Frei Caneca', address: 'Rua Frei Caneca, 569 - Consolação, São Paulo - SP' },
]

export const searchResults = [
  { name: 'Rua Augusta, 1500', address: 'Consolação, São Paulo - SP' },
  { name: 'MASP', address: 'Museu de Arte de São Paulo - Av. Paulista, 1578' },
  { name: 'Shopping Frei Caneca', address: 'Rua Frei Caneca, 569 - Consolação' },
  { name: 'Theatro Municipal', address: 'Praça Ramos de Azevedo - República' },
  { name: 'Aeroporto de Congonhas', address: 'Av. Washington Luís - Vila Congonhas' },
  { name: 'Parque Augusta', address: 'Rua Augusta, 200 - Consolação' },
  { name: 'Mercado Municipal', address: 'Rua da Cantareira, 306 - Centro' },
  { name: 'Catedral da Sé', address: 'Praça da Sé - Sé, São Paulo' },
  { name: 'Parque Ibirapuera', address: 'Av. Pedro Álvares Cabral - Vila Mariana' },
]

export const rides = [
  { id: 'uberx', name: 'UberX', seats: 4, price: 24.9, eta: '10:24', away: 'a 12 min', img: 'img/car-uberx.png' },
  { id: 'share', name: 'UberX Share', price: 19.9, eta: '10:25 - 10:31', away: 'a 13 min', img: 'img/car-share.png', promo: 'Economize até 30% compartilhando' },
  { id: 'connect', name: 'Connect', price: 14.5, eta: '10:22', away: 'a 10 min', img: 'img/car-connect.png' },
]

export const trips = [
  { month: 'Fev 2023', place: 'Parque Ibirapuera, São Paulo', date: '4 fev, 17:19', price: 0, cancelled: true, type: 'personal' },
  { month: 'Nov 2022', place: 'Parque Ibirapuera, São Paulo', date: '4 nov, 17:19', price: 17, type: 'work' },
  { month: 'Nov 2022', place: 'Parque Ibirapuera, São Paulo', date: '2 nov, 08:40', price: 26, type: 'personal' },
  { month: 'Out 2022', place: 'Parque Ibirapuera, São Paulo', date: '28 out, 19:05', price: 9, type: 'personal' },
  { month: 'Out 2022', place: 'Parque Ibirapuera, São Paulo', date: '15 out, 12:30', price: 46, type: 'work' },
  { month: 'Out 2022', place: 'Parque Ibirapuera, São Paulo', date: '3 out, 09:12', price: 0, cancelled: true, type: 'work' },
]

export const formatBRL = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

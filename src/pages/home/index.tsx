import { Container } from "../../components/container";

import { useState, useEffect } from "react";

import { db } from "../../services/firebaseConnection";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { set } from "firebase/database";

interface CarsProps {
  id: string;
  name: string;
  year: number;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  image: CarImageProps[];
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

export function Home() {

  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [inputSearch, setInputSearch] = useState<string>('');

  useEffect(() => {
    loadCars();
  }, [])

  function loadCars() {
    const carsRef = collection(db, 'cars');
    const queryRef = query(carsRef, orderBy('createdAt', 'desc'));

    getDocs(queryRef).then((snapshot) => {
      let listCars = [] as CarsProps[];

      snapshot.forEach((car) => {
        listCars.push({
          id: car.id,
          name: car.data().name,
          year: car.data().year,
          uid: car.data().uid,
          price: car.data().price,
          city: car.data().city,
          km: car.data().km,
          image: car.data().images
        })
      })

      setCars(listCars);
    })
  }

  function handleImageLoad(id: string) {
    setLoadImages(oldState => [...oldState, id])
  }

  async function handleSearchCar() {
    if (inputSearch === '') {
      loadCars();
      return;
    }

    setCars([]);
    setLoadImages([]);

    const q = query(collection(db, 'cars'),
      where('name', '>=', inputSearch.toUpperCase()),
      where('name', '<=', inputSearch.toUpperCase() + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    let listCars = [] as CarsProps[];

    querySnapshot.forEach((car) => {
      listCars.push({
        id: car.id,
        name: car.data().name,
        year: car.data().year,
        uid: car.data().uid,
        price: car.data().price,
        city: car.data().city,
        km: car.data().km,
        image: car.data().images
      })
    });

    setCars(listCars);
  }

  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          type="text"
          placeholder="Digite o nome do carro" className="w-full border-2 rounded-md h-9 px-3 outline-none" />
        <button onClick={handleSearchCar} className="bg-red-500 h-9 px-8 rounded-md text-white font-medium">Buscar</button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">Carros novos e usados em todo o Brasil!</h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {
          cars.map((car) => (
            <Link key={car.id} to={`/details/${car.id}`}>
              <section className="w-full bg-white text-black rounded-md hover:scale-105 transition-allshadow-2xl">
                <div
                  className="w-full h-72 rounded-md bg-slate-200"
                  style={{ display: loadImages.includes(car.id) ? "none" : "block" }}
                >
                </div>
                <img
                  className="w-full mb-3 max-h-72 rounded-t-md"
                  src={car.image[0].url}
                  alt={car.name}
                  onLoad={() => handleImageLoad(car.id)}
                  style={{ display: loadImages.includes(car.id) ? "block" : "none" }}
                />
                <div className="px-2">
                  <p className="font-bold">{car.name}</p>
                  <div className="flex flex-col">
                    <span className="text-zinc-700 mb-6">ano {car.year} | {car.km} KM</span>
                    <strong className="text-black font-medium text-xl">R$ {car.price}</strong>
                  </div>
                  <div className="border-t-2 border-b-gray-700 my-2 pb-2">
                    <p className="text-black mt-2">{car.city}</p>
                  </div>
                </div>
              </section>
            </Link>
          ))
        }
      </main>
    </Container>
  )
}
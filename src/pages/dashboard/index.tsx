import { Navbar } from "../../components/navbar";
import { Container } from "../../components/container";

import { FiTrash } from 'react-icons/fi'
import { useEffect, useState, useContext } from "react";

import { db } from "../../services/firebaseConnection";
import { collection, query, doc, getDocs, where, deleteDoc } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";

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

export function Dashboard() {
  const { user } = useContext(AuthContext)
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);


  useEffect(() => {
    function loadCars() {
      if (!user?.uid) {
        return
      }

      const carsRef = collection(db, 'cars');
      const queryRef = query(carsRef, where("uid", '==', user.uid));

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

    loadCars();
  }, [user])

  function handleImageLoad(id: string) {
    setLoadImages(oldState => [...oldState, id]);
  }

  async function handleDeleteCar(id: string) {
    const docRef = doc(db, "cars", id)
    await deleteDoc(docRef)
    setCars(cars.filter(car => car.id !== id))
  }

  return (
    <div >
      <Container>
        <Navbar />
        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {
            cars.map((car) => (
              <section
                key={car.id}
                className="w-full bg-white text-black rounded-md  relative">
                <div
                  className="w-full h-72 rounded-md bg-slate-200"
                  style={{ display: loadImages.includes(car.id) ? "none" : "block" }}
                >
                </div>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 drop-shadow"
                >
                  <FiTrash size={26} color="#000" />
                </button>
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
            ))
          }
        </main>

      </Container>
    </div>
  )
}
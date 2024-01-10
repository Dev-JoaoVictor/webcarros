import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "../../components/container"

import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

import { Swiper, SwiperSlide } from 'swiper/react';


interface CarProps {
  id: string;
  name: string;
  model: string;
  city: string;
  year: number;
  km: string;
  description: string;
  createdAt: string;
  price: string | number;
  uid: string;
  images: CarImageProps[];
  whatsapp: string;
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}


export function Details() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [car, setCar] = useState<CarProps>()
  const [slidePreview, setSlidePreview] = useState<number>(2)

  useEffect(() => {
    async function loadCar() {

      if (!id) return

      const docRef = await doc(db, "cars", id)
      getDoc(docRef)
        .then((snapshot) => {

          if (!snapshot.data) {
            navigate('/');
          }

          setCar({
            id: snapshot?.id,
            name: snapshot.data()?.name,
            model: snapshot.data()?.model,
            city: snapshot.data()?.city,
            year: snapshot.data()?.year,
            km: snapshot.data()?.km,
            description: snapshot.data()?.description,
            createdAt: snapshot.data()?.createdAt,
            price: snapshot.data()?.price,
            uid: snapshot.data()?.uid,
            images: snapshot.data()?.images,
            whatsapp: snapshot.data()?.whatsapp
          })
        })
    }

    loadCar()
  }, [id])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setSlidePreview(1)
      } else {
        setSlidePreview(2)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)

  }, [])

  return (
    <Container>
      {
        car && (
          <Swiper
            slidesPerView={slidePreview}
            pagination={{ clickable: true }}
            navigation
          >
            {
              car?.images.map((image) => (
                <SwiperSlide key={image.uid}>
                  <img src={image.url} alt={image.name} className="w-full rounded-md h-96 object-cover" />
                </SwiperSlide>
              ))
            }
          </Swiper>
        )
      }
      {
        car && (
          <main className="w-full bg-white rounded-md p-6 my-4">
            <div className="flex flex-col sm:flex-row mb-4 items-center justify-between font-bold text-2xl text-black">
              <p>{car.name}</p>
              <p>R$ {car.price}</p>
            </div>
            <div className="flex flex-col gap-2 my-2 md:flex-row justify-between">
              <p><strong>Modelo: </strong>{car.model}</p>
              <p><strong>Cidade: </strong>{car.city}</p>
              <p><strong>Ano: </strong>{car.year}</p>
              <p><strong>KM: </strong>{car.city}</p>
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p><strong>Descrição: </strong>{car.description}</p>
            </div>
            <strong>Telefone/Whatsapp</strong>
            <div className="flex items-center gap-2 p-1">
              <a href={`https://api.whatsapp.com/send?phone=55${car.whatsapp}`} target="_blank" rel="noreferrer" className=" rounded-full bg-green-500 p-2 text-white hover:bg-green-600 transition-colors">
                <FaWhatsapp size={20} />
              </a>
              <span>{car.whatsapp}</span>
            </div>

          </main>
        )
      }
    </Container>
  )
}
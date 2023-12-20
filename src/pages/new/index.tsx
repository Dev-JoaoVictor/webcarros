import { Navbar } from "../../components/navbar";
import { Container } from "../../components/container";

import { FiTrash, FiUpload } from "react-icons/fi";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "../../components/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { storage } from "../../services/firebaseConnection";
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import { v4 as uuidV4 } from 'uuid';

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  model: z.string().min(1, "O modelo é obrigatório"),
  year: z.string().min(1, "O ano é obrigatório"),
  km: z.string().min(1, "O KM é obrigatório"),
  price: z.string().min(1, "O preço é obrigatório"),
  city: z.string().min(1, "A cidade é obrigatória"),
  whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value) => /^\d{10,11}$/.test(value), "Número de telefone inválido"),
  description: z.string().min(1, "A descrição é obrigatória"),
})

type FormData = z.infer<typeof schema>

interface ImageItemProps {
  uuid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export function New() {

  const { user } = useContext(AuthContext);
  const [cartImages, setCartImages] = useState<ImageItemProps[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  function onSubmit(data: FormData) {
    console.log(data)
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        alert("Envie uma imagem no formato: JPEG ou PNG");
      }

    }
  }

  async function handleDeleteImage(item: ImageItemProps){
    const newImages = cartImages.filter(image => image.name !== item.name);
    setCartImages(newImages);

    const uploadRef = ref(storage, `images/${item.uuid}/${item.name}`);
    deleteObject(uploadRef);
  }

  async function handleUpload(image: File) {

    if (!user?.uid) {
      return alert("Você precisa estar logado para fazer isso")
    }

    const currentUser = user.uid;
    const uuidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUser}/${uuidImage}`);

    uploadBytes(uploadRef, image)
      .then((snaphot) => {
        getDownloadURL(snaphot.ref).then((downloadURL) => {

          const imageItem = {
            name: uuidImage,
            uuid: currentUser,
            previewUrl: URL.createObjectURL(image),
            url: downloadURL,
          }

          setCartImages((image) => [...image, imageItem]);
        })
      })
  }

  return (
    <Container>
      <Navbar />
      <div className="w-full bg-white p-3 rounded-md flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 border-gray-600 w-48 h-32 rounded-md flex items-center justify-center cursor-pointer md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} />
          </div>
          <div className="cursor-pointer ">
            <input type="file" accept="image/" className="opacity-0" onChange={handleFile} />
          </div>
        </button>

        {
          cartImages.map(item => (
            <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
              <button className="absolute p-2 rounded-lg hover:bg-red-500 transition-all" onClick={() => handleDeleteImage(item)}>
                <FiTrash size={28} color="#fff" />
              </button>
              <img
                src={item.previewUrl}
                alt={item.name}
                className="rounded-md w-full h-32 object-cover"
              />
            </div>
          ))
        }

      </div>

      <form
        className="w-full mt-2 bg-white p-3 rounded-md flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          label="Nome do carro"
          register={register}
          name="name"
          error={errors.name?.message}
          placeholder="Ex: Onix 1.0"
        />
        <Input
          type="text"
          label="Modelo do carro"
          register={register}
          name="model"
          error={errors.model?.message}
          placeholder="Ex: 1.0 - FLEX - PLUS - Manual "
        />
        <div className="w-full flex gap-4">
          <Input
            type="text"
            label="Ano do carro"
            register={register}
            name="year"
            error={errors.year?.message}
            placeholder="Ex: 2018/2019 "
          />
          <Input
            type="text"
            label="KM do carro"
            register={register}
            name="km"
            error={errors.km?.message}
            placeholder="Ex: 23.900 "
          />
        </div>
        <div className="w-full flex gap-4">
          <Input
            type="text"
            label="Preço do carro"
            register={register}
            name="price"
            error={errors.price?.message}
            placeholder="Ex: R$ 45.000 "
          />
          <Input
            type="text"
            label="Cidade"
            register={register}
            name="city"
            error={errors.city?.message}
            placeholder="Ex: São Paulo "
          />
        </div>
        <Input
          type="text"
          label="Telefone / Whatsapp"
          register={register}
          name="whatsapp"
          error={errors.whatsapp?.message}
          placeholder="Ex: 11999999999 "
        />

        <div className="mb-3">
          <label htmlFor="description" className="mb-2 font-medium">
            Descrição
          </label>
          <textarea
            id="description"
            className="w-full border-2 rounded-md h-32 px-2 outline-none resize-none"
            {...register("description")}
            placeholder="Digite a descrição completa sobre o carro"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <button type="submit" className="rounded-md mb-4 bg-zinc-900 text-white font-medium h-12">
          Cadastrar
        </button>
      </form>
    </Container>
  )
}
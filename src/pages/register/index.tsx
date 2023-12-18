import { Input } from "../../components/input";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/container";

import logo from '../../assets/logo.svg'

import { z } from "zod";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.string()
    .min(1, "O campo email é obrigatório").email("Insira um e-mail válido."),
  password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres")

})

type FormData = z.infer<typeof schema>

export function Register() {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth)
    }

    handleLogout();
  }, [])

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, { displayName: data.name })
        toast.success("Usuário cadastrado com sucesso!")
        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error("Erro ao cadastrado usuário!")
      })

  }

  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img src={logo} alt="Logo do site" className="w-full" />
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 flex flex-col gap-5 max-w-md w-full rounded-lg">

          <div>
            <Input
              type="text"
              placeholder="Digite seu nome"
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="Digite seu email"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button
            type="submit"
            className="bg-zinc-900 w-full rounded-md text-white h-14 font-medium">
            Cadastrar
          </button>
        </form>
        <Link to="/signin" className="text-zinc-900 font-medium text-center hover:opacity-50">
          Já possui uma conta ? Acesse agora!
        </Link>
      </div>
    </Container>
  )
}
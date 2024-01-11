import { useEffect } from "react";

import { Input } from "../../components/input";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/container";

import logo from '../../assets/logo.svg'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().min(1, "O campo email é obrigatório").email("Insira um e-mail válido."),
  password: z.string().min(1, "O campo senha é obrigatório")

})

type FormData = z.infer<typeof schema>

export function SignIn() {

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

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success("Usuário logado com sucesso!")
        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error("Error ao logar usuário!", error)
        return
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
            Acessar
          </button>
        </form>
        <Link to="/register" className="text-zinc-900 font-medium text-center hover:opacity-50">
          Ainda não possui uma conta ? Cadastre-se agora!
        </Link>
      </div>
    </Container>
  )
}
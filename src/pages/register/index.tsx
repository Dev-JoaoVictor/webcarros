import { Link } from "react-router-dom";
import { Input } from "../../components/input";
import { Container } from "../../components/container";

import logo from '../../assets/logo.svg'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.string()
    .min(1, "O campo email é obrigatório").email("Insira um e-mail válido."),
  password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres")

})

type FormData = z.infer<typeof schema>

export function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData) {
    console.log(data);
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
        <Link to="/signin" className="text-zinc-900 font-medium">
          Já possui uma conta ? Acesse agora!
        </Link>
      </div>
    </Container>
  )
}
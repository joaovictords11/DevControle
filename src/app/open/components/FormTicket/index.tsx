"use client";

import Input from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomerDataInfo } from "../../page";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório"),
  description: z.string().min(1, "Descreva um pouco sobre seu problema..."),
});

type FormData = z.infer<typeof schema>;

type FormTicketProps = {
  customer: CustomerDataInfo;
};

const FormTicket = ({ customer }: FormTicketProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterTicket)}
      className="bg-slate-200 mt-6 px-4 py-6 rounded border-2"
    >
      <label className="mb-1 font-medium text-lg">Nome do chamado</label>
      <Input
        name="name"
        type="text"
        register={register}
        placeholder="Digite o nome do chamado"
        error={errors.name?.message}
      />
      <label className="mb-1 font-medium text-lg">Descreva o problema</label>
      <textarea
        className="w-full border-2 rounded-md h-24 resize-none px-2 py-1"
        id="description"
        {...register("description")}
        placeholder="Descreva o seu problema..."
      />
      {errors.description?.message && (
        <p className="text-red-500 mt-1 mb-4">{errors.description?.message}</p>
      )}
      <button
        type="submit"
        className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold hover:bg-blue-600 duration-200"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default FormTicket;

"use client";

import Input from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "O campo é obrigatório"),
  email: z
    .string()
    .min(1, "O campo é obrigatório")
    .email("Digite um email válido"),
  phone: z
    .string()
    .min(1, "O campo é obrigatório")
    .refine(
      (value) => {
        return (
          /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
          /^\d{2}\s\d{9}$/.test(value) ||
          /^\d{11}$/.test(value)
        );
      },
      {
        message: "O número de telefone deve estar (DDD) 999999999",
      }
    ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

const NewCustomerForm = ({ userId }: { userId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter()

  async function handleRegisterCustomer(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      userId: userId,
    });

    reset();
    router.refresh()
    router.replace("/dashboard/customer")
  }

  return (
    <form
      className="flex flex-col mt-5"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        register={register}
        error={errors.name?.message}
      />
      <section className="flex gap-2 my-2 flex-col sm:flex-row">
        <div className="flex-grow">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="text"
            name="phone"
            placeholder="Exemplo: (11) 999101900"
            register={register}
            error={errors.phone?.message}
          />
        </div>
        <div className="flex-grow">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o email"
            register={register}
            error={errors.email?.message}
          />
        </div>
      </section>
      <label className="mb-1 text-lg font-medium">Endereço completo</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço do cliente"
        register={register}
        error={errors.address?.message}
      />
      <button
        type="submit"
        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:bg-blue-600 duration-300"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default NewCustomerForm;

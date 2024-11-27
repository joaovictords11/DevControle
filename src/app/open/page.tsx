"use client";

import Input from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { z } from "zod";
import FormTicket from "./components/FormTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email do cliente para localizar")
    .min(1, "O campo email é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export type CustomerDataInfo = {
  id: string;
  name: string;
};

const OpenTicket = () => {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email,
      },
    });

    if (response.data === null) {
      setError("email", {
        type: "custom",
        message: "Ops, cliente não encontrado",
      });
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

      <main className="flex flex-col mt-4 mb-7">
        {!customer ? (
          <form
            onSubmit={handleSubmit(handleSearchCustomer)}
            className="bg-slate-200 py-6 px-4 rounded border-2"
          >
            <div className="flex flex-col gap-4">
              <Input
                name="email"
                placeholder="Digite o email do cliente..."
                type="text"
                error={errors.email?.message}
                register={register}
              />
              <button className="bg-blue-500 hover:bg-blue-600 duration-300 flex gap-3 px-2 h-11 items-center justify-center text-white font-bold rounded">
                Procurar cliente <FiSearch size={24} color="white" />
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-slate-200 py-6 px-4 rounded border-2 flex items-center justify-between">
            <p className="text-lg">
              <strong>Cliente selecionado: </strong> {customer.name}{" "}
            </p>
            <button
              type="submit"
              onClick={handleClearCustomer}
              className="flex items-center justify-center rounded"
            >
              <FiX
                size={30}
                className="text-red-500 hover:text-red-600 duration-200"
              />
            </button>
          </div>
        )}

        {customer && <FormTicket customer={customer} />}
      </main>
    </div>
  );
};

export default OpenTicket;

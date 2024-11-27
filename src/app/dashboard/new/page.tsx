import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const NewTicket = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    await prisma.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-gray-900 px-4 py-1 rounded text-white hover:bg-black duration-300"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>
        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            type="text"
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            placeholder="Digite o nome do chamado"
            required
            name="name"
          />
          <label className="mb-1 font-medium text-lg">
            Descreva o problema
          </label>
          <textarea
            className="w-full border-2 rounded-md p-2 mb-2 h-24 resize-none"
            placeholder="Descreva o problema..."
            required
            name="description"
          />
          {customers.length > 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione o cliente
              </label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"
                name="customer"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Você ainda não tem nenhum cliente,{" "}
              <span className="text-blue-500">Cadastrar cliente</span>
            </Link>
          )}

          <button
            type="submit"
            disabled={customers.length === 0}
            className="bg-blue-500 font-bold text-white px-2 h-11 rounded-md my-4 hover:bg-blue-600 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
};

export default NewTicket;

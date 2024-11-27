import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import CustomerCard from "./components/card";
import prisma from "@/lib/prisma";

const Customer = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-700 duration-300"
          >
            Novo cliente
          </Link>
        </div>
        <section className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </section>
        {customers.length === 0 && (
          <h1 className="text-gray-600">Você ainda não possui nenhum cliente cadastrado</h1>
        )}
      </main>
    </Container>
  );
};

export default Customer;

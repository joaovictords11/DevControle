"use client";

import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiCheckSquare, FiFile } from "react-icons/fi";

type TicketItemProps = {
  ticket: TicketProps;
  customer: CustomerProps | null;
};

const TicketItem = ({ ticket, customer }: TicketItemProps) => {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer,
      ticket,
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-slate-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-3" onClick={handleChangeStatus}>
            <FiCheckSquare
              size={24}
              color="#636262"
              className="hover:scale-110 duration-200"
            />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile
              size={24}
              color="#3b82f6"
              className="hover:scale-110 duration-200"
            />
          </button>
        </td>
      </tr>
    </>
  );
};

export default TicketItem;

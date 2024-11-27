import Image from "next/image";
import heroImg from "../assets/hero.svg";

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl mb-8 text-center text-blue-600 md:text-4xl">
        Atendimentos, Clientes
      </h1>
      <Image
        src={heroImg}
        alt="Imagem hero do Dev Controle"
        width={480}
        className="max-w-xs md:max-w-lg"
        priority
        quality={100}
      />
    </main>
  );
}

import Image from "next/image";
import { FormEvent, useState } from "react";
import appPreviewImage from "../assets/app-nlw-copa-preview.png";
import appIconCheck from "../assets/icon-check.svg";
import appLogo from "../assets/logo.svg";
import appAvatarExemple from "../assets/users-avatar-example.png";
import { apiClient } from "../services/apiClient";

type HomeProps = {
  poolCount: number;
  guessCount: number;
  userCount: number;
};

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [codeMsg, setCodeMsg] = useState("");
  const [poolName, setPoolName] = useState("");

  const handleCreatePool = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await apiClient.post("/pools", { name: poolName });

      const { code } = await response.data;
      console.log(code);
      await navigator.clipboard.writeText(code);

      alert(
        "Bolão criado com sucesso! Número do bolão copiado para a área de transferência.",
      );

      setPoolName("");
    } catch (error) {
      console.log(error);
      alert("Houve um erro na hora de criar a aposta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1124px] h-screen mx-auto p-8 grid grid-cols-2 items-center text-gray-100 gap-24">
      <main>
        <Image src={appLogo} alt="Logo" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={appAvatarExemple} alt="Images de exemplo dos usuários" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500"> + {poolCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form onSubmit={handleCreatePool} className="mt-10 flex gap-2">
          <input
            onChange={(event) => setPoolName(event.target.value)}
            value={poolName}
            type="text"
            placeholder="Nome do bolão"
            className="flex-1 px-6 py-4 rounded bg-gray-800 border placeholder-gray-600 text-sm border-gray-600 text-gray-100"
            required
          />
          <button
            type="submit"
            className="bg-explorer-500 px-6 py-4 rounded font-bold uppercase text-sm text-gray-900 hover:bg-explorer-600"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar seus amigos 🌵
        </p>

        {codeMsg ? (
          <div className="mt-10 flex items-center gap-2">
            <Image src={appIconCheck} alt="Ícone de check" />
            <strong className="text-gray-100 text-xl">
              Código do seu bolão: {codeMsg}
            </strong>
          </div>
        ) : null}

        <div className="grid grid-cols-2 mt-10 pt-10 border-t border-gray-600 divide-x text-gray-100 mb-8 divide-gray-600">
          <div className="flex items-center gap-6 justify-start">
            <Image src={appIconCheck} alt="Ícone de check" />
            <div className="flex flex-col">
              <strong className="text-2xl">+ {userCount}</strong>
              <span>Bolões criados</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-6 justify-end">
              <Image src={appIconCheck} alt="Ícone de check" />
              <div className="flex flex-col">
                <strong className="text-2xl">+ {guessCount}</strong>
                <span>Palpites dados</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImage}
        alt="Dois celulares exibindo preview da versão mobile"
        width={450}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      apiClient.get("pools/count"),
      apiClient.get("guesses/count"),
      apiClient.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};

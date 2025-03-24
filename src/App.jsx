import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Cookies from "js-cookie";
import { CircleCheck, CircleX, Equal } from "lucide-react";
import { useEffect, useState } from "react";
import { serie_a } from "./competicoes/serie-a";
import Header from "./components/Header";
import { Button } from "./components/ui/button";
import { renderColor } from "./hooks/useColor";
import { renderIcon } from "./hooks/useIcons";
import { primeiroTurnoPorTime, segundoTurnoPorTime } from "./hooks/useRounds";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(
    () => Cookies.get("selectedTeam") || null
  );
  const [pontuacoes, setPontuacoes] = useState(() => {
    return JSON.parse(Cookies.get("pontuacoes") || "{}");
  });

  useEffect(() => {
    Cookies.set("selectedTeam", selectedTeam, { expires: 30 });
  }, [selectedTeam]);

  useEffect(() => {
    Cookies.set("pontuacoes", JSON.stringify(pontuacoes), { expires: 30 });
  }, [pontuacoes]);

  const handleTeamSelect = (team) => setSelectedTeam(team);
  const handleClearSelection = () => {
    setSelectedTeam(null);
    Cookies.remove("selectedTeam");
    setPontuacoes({});
    Cookies.remove("pontuacoes");
  };

  const handleSelectChange = (value, adversarioId, turno, tipo) => {
    setPontuacoes((prev) => ({
      ...prev,
      [turno]: {
        ...prev[turno],
        [adversarioId]: {
          ...prev[turno]?.[adversarioId],
          [tipo]: parseInt(value),
        },
      },
    }));
  };

  const calcularAproveitamento = (turno) => {
    const dados = pontuacoes[turno] || {};
    const totalEfetivo = Object.values(dados).reduce(
      (acc, cur) => acc + (cur.efetivo || 0),
      0
    );
    const totalPlanejado = Object.values(dados).reduce(
      (acc, cur) => acc + (cur.planejado || 0),
      0
    );
    return totalPlanejado
      ? ((totalEfetivo / totalPlanejado) * 100).toFixed(2) + "%"
      : "0%";
  };

  const renderTable = (turno, label) => {
    const jogos =
      turno === "primeiro"
        ? primeiroTurnoPorTime[selectedTeam]
        : segundoTurnoPorTime[selectedTeam];
    if (!jogos) return null;

    return (
      <>
        <p className="font-bold text-xl">{label}</p>
        <div
          className={`${renderColor(
            selectedTeam
          )} rounded-sm p-4 text-2xl flex justify-between`}
        >
          <div className="flex flex-col">
            <p>Planejado</p>
            <p className="text-4xl">
              {Object.values(pontuacoes[turno] || {}).reduce(
                (acc, cur) => acc + (cur.planejado || 0),
                0
              )}{" "}
              pontos
            </p>
          </div>
          <div className="flex flex-col">
            <p>Efetivo </p>
            <p className="text-4xl">
              {Object.values(pontuacoes[turno] || {}).reduce(
                (acc, cur) => acc + (cur.efetivo || 0),
                0
              )}{" "}
              pontos
            </p>
          </div>
          <div className="flex flex-col">
            <p>Aproveitamento</p>
            <p className="text-4xl">{calcularAproveitamento(turno)}</p>
          </div>
        </div>

        <Table className="border mt-2 whitespace-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead className="w-40">Adversário</TableHead>
              <TableHead className="w-40 max-sm:pl-10">Estádio</TableHead>
              <TableHead className="max-sm:pl-4">Planejado</TableHead>
              <TableHead className="max-sm:pl-4">Efetivo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jogos.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex font-bold gap-2 items-center text-xl max-sm:text-base">
                  {renderIcon(item.adversario)} {item.adversario}
                </TableCell>
                <TableCell className="text-slate-400 text-base max-sm:text-sm max-sm:pl-10">
                  {item.local}
                </TableCell>
                {["planejado", "efetivo"].map((tipo) => (
                  <TableCell key={tipo}>
                    <Select
                      value={
                        pontuacoes[turno]?.[item.id]?.[tipo]
                          ? String(pontuacoes[turno][item.id][tipo])
                          : ""
                      }
                      onValueChange={(value) =>
                        handleSelectChange(value, item.id, turno, tipo)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="3">
                            <span className="flex items-center gap-2 text-xl">
                              <CircleCheck
                                size={14}
                                className="text-green-500"
                              />{" "}
                              Vitória
                            </span>
                          </SelectItem>
                          <SelectItem value="1">
                            <span className="flex items-center gap-2 text-xl">
                              <Equal size={14} className="text-slate-500" />{" "}
                              Empate
                            </span>
                          </SelectItem>
                          <SelectItem value="0">
                            <span className="flex items-center gap-2 text-xl">
                              <CircleX size={14} className="text-red-500" />{" "}
                              Derrota
                            </span>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };

  return (
    <main className="max-w-screen-xl mx-auto p-4">
      <div className="w-full mx-auto">
        <Header />
        <div className="flex my-4">
          <h2 className="text-4xl font-bold">Escolha seu time</h2>
          <Button
            variant={"outline"}
            onClick={handleClearSelection}
            className="ml-2"
          >
            Limpar
          </Button>
        </div>

        <div className="flex items-center">
          <Select onValueChange={handleTeamSelect} className="mr-2">
            <SelectTrigger className="border-2 py-6 border-black rounded-sm">
              <SelectValue placeholder="Selecione seu time" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {serie_a.map((item) => (
                  <SelectItem key={item.id} value={item.nome}>
                    <span className="flex gap-2">
                      {renderIcon(item.nome)} {item.nome}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {selectedTeam && (
          <div
            className={`${renderColor(
              selectedTeam
            )} flex gap-2 px-4 py-6 mt-8 items-center rounded-sm text-xl`}
          >
            {renderIcon(selectedTeam)} {selectedTeam}
          </div>
        )}
      </div>

      <div className="flex w-full max-md:flex-col mt-10 gap-8">
        <div className="w-1/2 max-md:w-full">
          {renderTable("primeiro", "Primeiro Turno")}
        </div>
        <div className="w-1/2 max-md:w-full">
          {renderTable("segundo", "Segundo Turno")}
        </div>
      </div>
    </main>
  );
}

export default App;

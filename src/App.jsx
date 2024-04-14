import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleCheck, CircleX, Equal, Home, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { serie_a } from "./competicoes/serie-a";
import Header from "./components/Header";
import { Button } from "./components/ui/button";
import { renderColor } from "./hooks/useColor";
import { renderIcon } from "./hooks/useIcons";
import { primeiroTurnoPorTime, segundoTurnoPorTime } from "./hooks/useRounds";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(localStorage.getItem("selectedTeam") !== "null" ? localStorage.getItem("selectedTeam") : null);
  const [pontuacaoPlanejadoPrimeiroTurno, setPontuacaoPlanejadoPrimeiroTurno] = useState({});
  const [pontuacaoEfetivoPrimeiroTurno, setPontuacaoEfetivoPrimeiroTurno] = useState({});
  const [pontuacaoPlanejadoSegundoTurno, setPontuacaoPlanejadoSegundoTurno] = useState({});
  const [pontuacaoEfetivoSegundoTurno, setPontuacaoEfetivoSegundoTurno] = useState({});

  useEffect(() => {
    localStorage.setItem("selectedTeam", selectedTeam);
  }, [selectedTeam]);

  useEffect(() => {
    setPontuacaoPlanejadoPrimeiroTurno({});
    setPontuacaoEfetivoPrimeiroTurno({});
    setPontuacaoPlanejadoSegundoTurno({});
    setPontuacaoEfetivoSegundoTurno({});
  }, [selectedTeam]);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleClearSelection = () => {
    setSelectedTeam(null);
    localStorage.removeItem("selectedTeam");
  };

  const handleSelectPlanejado = (event, adversarioId, turno) => {
    const resultado = parseInt(event.target.value);
    if (turno === "primeiro") {
      setPontuacaoPlanejadoPrimeiroTurno((prevPontuacao) => ({
        ...prevPontuacao,
        [adversarioId]: resultado,
      }));
    } else if (turno === "segundo") {
      setPontuacaoPlanejadoSegundoTurno((prevPontuacao) => ({
        ...prevPontuacao,
        [adversarioId]: resultado,
      }));
    }
  };

  const handleSelectEfetivo = (event, adversarioId, turno) => {
    const resultado = parseInt(event.target.value);
    if (turno === "primeiro") {
      setPontuacaoEfetivoPrimeiroTurno((prevPontuacao) => ({
        ...prevPontuacao,
        [adversarioId]: resultado,
      }));
    } else if (turno === "segundo") {
      setPontuacaoEfetivoSegundoTurno((prevPontuacao) => ({
        ...prevPontuacao,
        [adversarioId]: resultado,
      }));
    }
  };

  const calcularAproveitamento = (planejado, efetivo) => {
    const totalPlanejado = Object.values(planejado).reduce((total, pontuacao) => total + pontuacao, 0);
    const totalEfetivo = Object.values(efetivo).reduce((total, pontuacao) => total + pontuacao, 0);
    if (totalPlanejado === 0) return "0%";
    return ((totalEfetivo / totalPlanejado) * 100).toFixed(2) + "%";
  };

  const primeiroTurno = primeiroTurnoPorTime[selectedTeam];
  const segundoTurno = segundoTurnoPorTime[selectedTeam];

  return (
    <main className="max-w-screen-xl mx-auto p-4">
      <div className="w-full mx-auto">
        <Header />
        <div className="flex my-4">
          <h2 className="text-4xl font-bold">Escolha seu time</h2>
          <Button variant={"outline"} onClick={handleClearSelection} className="ml-2">
            <button>Limpar</button>
          </Button>
        </div>

        <div className="flex items-center">
          <Select onValueChange={(value) => handleTeamSelect(value)} className="mr-2">
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
        {selectedTeam !== null && (
          <div className={`${renderColor(selectedTeam)} flex gap-2 px-4 py-6 mt-8 items-center rounded-sm text-xl`}>
            {renderIcon(selectedTeam)}
            {selectedTeam}
          </div>
        )}
      </div>
      <div className="flex w-full max-sm:flex-col mt-10 gap-8">
        <div className="w-1/2 max-sm:w-full">
          {primeiroTurno && (
            <>
              <p className="font-bold text-xl">Primeiro Turno</p>
              <div className="bg-zinc-600 text-white rounded-sm p-4 text-2xl">
                <p className="border-b">
                  Planejado: {Object.values(pontuacaoPlanejadoPrimeiroTurno).reduce((total, pontuacao) => total + pontuacao, 0)}
                </p>
                <p className="border-b">Efetivo: {Object.values(pontuacaoEfetivoPrimeiroTurno).reduce((total, pontuacao) => total + pontuacao, 0)}</p>
                <p className="border-b">Aproveitamento: {calcularAproveitamento(pontuacaoPlanejadoPrimeiroTurno, pontuacaoEfetivoPrimeiroTurno)}</p>
              </div>

              <Table className="border mt-2 whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">Adversário</TableHead>
                    <TableHead>Mando</TableHead>
                    <TableHead className="w-40">Estádio</TableHead>
                    <TableHead>Planejado</TableHead>
                    <TableHead>Efetivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {primeiroTurno.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex font-bold gap-2 items-center text-xl">
                        {renderIcon(item.adversario)} {item.adversario}
                      </TableCell>

                      <TableCell>
                        {item.mandoDeCampo === "Casa" ? <Home className="text-slate-800" size="16" /> : <Plane className="text-black" size="16" />}
                      </TableCell>

                      <TableCell className="text-slate-400 text-base">{item.local}</TableCell>
                      <TableCell>
                        <Select onValueChange={(value) => handleSelectPlanejado({ target: { value } }, item.id, "primeiro")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="3">
                                <span className="flex items-center gap-2 text-xl">
                                  <CircleCheck size={14} className="text-green-500" /> Vitória
                                </span>
                              </SelectItem>
                              <SelectItem value="1">
                                <span className="flex items-center gap-2 text-xl">
                                  <Equal size={14} className="text-slate-500" /> Empate
                                </span>
                              </SelectItem>
                              <SelectItem value="0">
                                <span className="flex items-center gap-2 text-xl">
                                  <CircleX size={14} className="text-red-500" /> Derrota
                                </span>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select onValueChange={(value) => handleSelectEfetivo({ target: { value } }, item.id, "primeiro")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="3">
                                <span className="flex items-center gap-2 text-xl">
                                  <CircleCheck size={14} className="text-green-500" /> Vitória
                                </span>
                              </SelectItem>
                              <SelectItem value="1">
                                <span className="flex items-center gap-2 text-xl">
                                  <Equal size={14} className="text-slate-500" /> Empate
                                </span>
                              </SelectItem>
                              <SelectItem value="0">
                                <span className="flex items-center gap-2 text-xl">
                                  <CircleX size={14} className="text-red-500" /> Derrota
                                </span>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
        <div className="w-1/2 max-sm:w-full">
          {segundoTurno && (
            <>
              <p className="font-bold text-xl">Segundo Turno</p>
              <div className="bg-zinc-600 text-white rounded-sm p-4 text-2xl">
                <p className="border-b">
                  Planejado: {Object.values(pontuacaoPlanejadoSegundoTurno).reduce((total, pontuacao) => total + pontuacao, 0)}
                </p>
                <p className="border-b">Efetivo: {Object.values(pontuacaoEfetivoSegundoTurno).reduce((total, pontuacao) => total + pontuacao, 0)}</p>
                <p className="border-b">Aproveitamento: {calcularAproveitamento(pontuacaoPlanejadoSegundoTurno, pontuacaoEfetivoSegundoTurno)}</p>
              </div>

              <Table className="border mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">Adversário</TableHead>
                    <TableHead>Mando</TableHead>
                    <TableHead className="w-40">Estádio</TableHead>
                    <TableHead>Planejado</TableHead>
                    <TableHead>Efetivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {segundoTurno.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex font-bold gap-2 items-center text-xl">
                        {renderIcon(item.adversario)} {item.adversario}
                      </TableCell>

                      <TableCell>
                        {item.mandoDeCampo === "Casa" ? <Home className="text-slate-800" size="16" /> : <Plane className="text-black" size="16" />}
                      </TableCell>

                      <TableCell className="text-slate-400 text-base">{item.local}</TableCell>
                      <TableCell>
                        <Select onValueChange={(value) => handleSelectPlanejado({ target: { value } }, item.id, "primeiro")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="3">
                                <span className="flex items-center gap-2 text-xl">
                                  <CircleCheck size={14} className="text-green-500" /> Vitória
                                </span>
                              </SelectItem>
                              <SelectItem value="1">
                                <span className="flex items-center gap-2 text-xl">
                                  <Equal size={14} className="text-slate-500" /> Empate
                                </span>
                              </SelectItem>
                              <SelectItem value="0">
                                <span className="flex items-center gap-2 text-xl">
                                  <CircleX size={14} className="text-red-500" /> Derrota
                                </span>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select onValueChange={(value) => handleSelectEfetivo({ target: { value } }, item.id, "primeiro")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="3">
                                <span className="flex items-center gap-2 text-xl">
                                  <CircleCheck size={14} className="text-green-500" /> Vitória
                                </span>
                              </SelectItem>
                              <SelectItem value="1">
                                <span className="flex items-center gap-2 text-xl">
                                  <Equal size={14} className="text-slate-500" /> Empate
                                </span>
                              </SelectItem>
                              <SelectItem value="0">
                                <span className="flex items-center gap-2 text-xl">
                                  <CircleX size={14} className="text-red-500" /> Derrota
                                </span>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Home, Plane } from "lucide-react";
import { useState } from "react";
import { serie_a } from "./competicoes/serie-a";
import { Button } from "./components/ui/button";
import { primeiro_turno_flamengo } from "./times/flamengo";
import { primeiro_turno_vasco } from "./times/vasco";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [pontuacaoPlanejado, setPontuacaoPlanejado] = useState(0);
  const [pontuacaoEfetivo, setPontuacaoEfetivo] = useState(0);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleSelectPlanejado = (event) => {
    const resultado = parseInt(event.target.value);
    if (resultado === 3 || resultado === 1) {
      setPontuacaoPlanejado((prevPontuacao) => prevPontuacao + resultado);
    }
  };

  const handleSelectEfetivo = (event) => {
    const resultado = parseInt(event.target.value);
    if (resultado === 3 || resultado === 1) {
      setPontuacaoEfetivo((prevPontuacao) => prevPontuacao + resultado);
    }
  };

  // Mapeamento dos times para as listas de primeiro turno
  const primeiroTurnoPorTime = {
    Vasco: primeiro_turno_vasco,
    Flamengo: primeiro_turno_flamengo,
  };

  // Determinar a lista de primeiro turno com base no time selecionado
  const primeiroTurno = primeiroTurnoPorTime[selectedTeam];

  return (
    <main className="max-w-screen-xl mx-auto  p-4">
      <div className="w-96 mx-auto">
        <p className="text-3xl font-bold text-center mb-4">Planejadas BR 2024</p>
        <h2 className="text-xl font-bold text-center mb-4">Escolha seu time</h2>
        <Select onValueChange={(value) => handleTeamSelect(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione seu time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {serie_a.map((team) => (
                <SelectItem key={team.id} value={team.nome}>
                  {team.nome}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedTeam && <p className="text-md text-gray-600 mt-1">Time selecionado: {selectedTeam}</p>}
      </div>
      <div className="flex w-full mt-8 gap-4">
        <div className="w-1/2">
          <p>Planejado: {pontuacaoPlanejado}</p>
          <p>Efetivo: {pontuacaoEfetivo}</p>

          <p>1º Turno</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Mando</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Planejado</TableHead>
                <TableHead>Efetivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {primeiroTurno &&
                primeiroTurno.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-bold">{item.adversario}</TableCell>
                    <TableCell>{item.mandoDeCampo === "Casa" ? <Home /> : <Plane />}</TableCell>
                    <TableCell>{item.local}</TableCell>
                    <TableCell>
                      <select onChange={handleSelectPlanejado}>
                        <option value="" disabled selected></option>
                        <option value="3">Vitória</option>
                        <option value="1">Empate</option>
                        <option value="0">Derrota</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <select onChange={handleSelectEfetivo}>
                        <option value="" disabled selected></option>
                        <option value="3">Vitória</option>
                        <option value="1">Empate</option>
                        <option value="0">Derrota</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="w-1/2">
          <p>2º Turno</p>
          {/* Aqui você pode adicionar a lógica para o segundo turno, se necessário */}
        </div>
      </div>
      <div className="mt-4">
        <Button>Compartilhar</Button>
      </div>
    </main>
  );
}

export default App;

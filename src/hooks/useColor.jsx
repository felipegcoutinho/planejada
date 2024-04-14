// Mapeamento dos adversários para os ícones correspondentes
const color = {
  "Athletico-PR": "bg-red-600 text-black",
  "Atlético-GO": "bg-red-800 text-white",
  "Atlético-MG": "bg-black text-white",
  Bahia: "bg-blue-200 text-[#2762A6]",
  Botafogo: "bg-zinc-600 text-white",
  Corinthians: "bg-red-800 text-white",
  Cruzeiro: "bg-blue-900 text-white",
  Criciúma: "bg-amber-300",
  Cuiabá: "bg-green-800 text-yellow-400",
  Flamengo: "bg-red-600",
  Fluminense: "bg-rose-800 text-white",
  Fortaleza: "bg-rose-800 text-white",
  Grêmio: "bg-blue-500 text-white",
  Internacional: "bg-red-600 text-white",
  Juventude: "bg-emerald-600 text-white",
  Palmeiras: "bg-green-700 text-white",
  "RB Bragantino": "bg-[#E41349] text-white",
  "São Paulo": "bg-red-800 text-white",
  Vasco: "bg-black text-white",
  Vitória: "bg-red-800 text-white",
};

export function renderColor(adversario) {
  if (color.hasOwnProperty(adversario)) {
    const Color = color[adversario];
    return Color;
  }

  return null;
}

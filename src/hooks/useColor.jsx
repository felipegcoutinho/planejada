// Mapeamento dos adversários para os ícones correspondentes
const color = {
  "Athletico-PR": "bg-red-600 text-black shadow-2xl shadow-red-400",
  "Atlético-GO": "bg-red-800 text-white shadow-2xl shadow-red-400",
  "Atlético-MG": "bg-black text-white shadow-2xl shadow-zinc-500",
  Bahia: "bg-blue-200 text-[#2762A6] shadow-2xl shadow-blue-200",
  Botafogo: "bg-zinc-600 text-white shadow-2xl shadow-zinc-400",
  Corinthians: "bg-red-800 text-white shadow-2xl shadow-red-400",
  Cruzeiro: "bg-blue-900 text-white shadow-2xl shadow-blue-400",
  Criciúma: "bg-amber-300 shadow-2xl shadow-amber-400",
  Cuiabá: "bg-green-800 text-yellow-400 shadow-2xl shadow-green-400",
  Flamengo: "bg-red-600 shadow-2xl shadow-red-400",
  Fluminense: "bg-rose-800 text-white shadow-2xl shadow-rose-400",
  Fortaleza: "bg-rose-800 text-white shadow-2xl shadow-rose-400",
  Grêmio: "bg-blue-500 text-white shadow-2xl shadow-blue-400",
  Internacional: "bg-red-600 text-white shadow-2xl shadow-red-400",
  Juventude: "bg-emerald-600 text-white shadow-2xl shadow-emerald-400",
  Palmeiras: "bg-green-700 text-white shadow-2xl shadow-green-400",
  "RB Bragantino": "bg-[#E41349] text-white shadow-2xl shadow-rose-400",
  "São Paulo": "bg-red-800 text-white shadow-2xl shadow-red-400",
  Vasco: "bg-black text-white shadow-2xl shadow-zinc-400",
  Vitória: "bg-red-800 text-white shadow-2xl shadow-red-400",
};

export function renderColor(adversario) {
  if (color.hasOwnProperty(adversario)) {
    const Color = color[adversario];
    return Color;
  }

  return null;
}

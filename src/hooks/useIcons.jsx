import atleticoPrIcon from "../assets/athletico-pr.svg";
import atleticoGoIcon from "../assets/atletico-go.svg";
import atleticoMgIcon from "../assets/atletico-mg.svg";
import bahiaIcon from "../assets/bahia.svg";
import botafogoIcon from "../assets/botafogo.svg";
import bragantinoIcon from "../assets/bragantino.svg";
import corinthiansIcon from "../assets/corinthians.svg";
import criciumaIcon from "../assets/criciuma.svg";
import cruzeiroIcon from "../assets/cruzeiro.svg";
import cuiabaIcon from "../assets/cuiaba.svg";
import flamengoIcon from "../assets/flamengo.svg";
import fluminenseIcon from "../assets/fluminense.svg";
import fortalezaIcon from "../assets/fortaleza.svg";
import gremioIcon from "../assets/gremio.svg";
import internacionalIcon from "../assets/internacional.svg";
import juventudeIcon from "../assets/juventude.svg";
import palmeirasIcon from "../assets/palmeiras.svg";
import saoPauloIcon from "../assets/sao-paulo.svg";
import vascoIcon from "../assets/vasco.svg";
import vitoriaIcon from "../assets/vitoria.svg";

const icons = {
  Grêmio: gremioIcon,
  Fluminense: fluminenseIcon,
  Vasco: vascoIcon,
  Flamengo: flamengoIcon,
  Corinthians: corinthiansIcon,
  Palmeiras: palmeirasIcon,
  "São Paulo": saoPauloIcon,
  Internacional: internacionalIcon,
  "Atlético-MG": atleticoMgIcon,
  Cruzeiro: cruzeiroIcon,
  "Atlético-GO": atleticoGoIcon,
  "Athletico-PR": atleticoPrIcon,
  Bahia: bahiaIcon,
  Botafogo: botafogoIcon,
  "RB Bragantino": bragantinoIcon,
  Cuiabá: cuiabaIcon,
  Criciúma: criciumaIcon,
  Fortaleza: fortalezaIcon,
  Juventude: juventudeIcon,
  Vitória: vitoriaIcon,
};

export function renderIcon(adversario) {
  if (icons.hasOwnProperty(adversario)) {
    const IconComponent = icons[adversario];
    return <img src={IconComponent} alt={adversario} width={24} height={24} />;
  }

  return null;
}

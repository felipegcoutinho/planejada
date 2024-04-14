import { Card } from "./ui/card";

function Header() {
  return (
    <Card className="flex h-20 items-center bg-black text-white px-4 rounded-sm ">
      <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <a href="#" className="font-bold text-2xl">
          Planejadas / Brasileirão 2024
        </a>
      </div>
    </Card>
  );
}

export default Header;

import { useMemo } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "@/components/ui/button";
import icon from "../assets/icon.png";
import ThemeToggle from "./theme-toggle";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Header() {
  return (
    <header className="titleBarContainer border-b">
      <div className="titleBar pr-2 flex gap-2 items-center">
        <Link to="/" id="logo" className="w-44 border-r h-10 flex items-center gap-2 justify-center">
          <img src={icon} alt="logo" className="w-8 h-8" />
          <span>轻·音乐</span>
        </Link>
        <HistoryNavigation />
        <div className="flex-1 h-full draggable"></div>
        {import.meta.env.DEV && <button onClick={() => window.devAPI.toggleDevtools()}>devtools</button>}
        <ThemeToggle />
      </div>
    </header>
  );
}

function HistoryNavigation() {
  // const location = useLocation();
  const navigate = useNavigate();

  const historyState = useMemo(
    () => ({
      index: window.history.state.index,
      length: window.history.length,
    }),
    [],
  );

  return (
    <>
      <Button title="后退" size="sm" variant="outline" disabled={historyState.index === 0} onClick={() => navigate(-1)}>
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="sm"
        title="前进"
        disabled={historyState.index === historyState.length - 1}
        onClick={() => navigate(1)}
      >
        <ChevronRight />
      </Button>
    </>
  );
}

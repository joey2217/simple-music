import { CircleX, SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import useSWR from "swr";
import { cn } from "@/lib/utils";

export default function SearchInput({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch((e.target as unknown as { value: string }).value);
    } else if (e.key === "Escape") {
      const inputEl = inputRef.current;
      if (inputEl) {
        inputEl.blur();
      }
    }
  };

  function onSearch(word: string) {
    setKeyword(keyword);
    navigate(`/search?keyword=${word}`);
  }

  return (
    <div className={cn("w-72", className, "relative")} {...props}>
      <InputGroup className={`${open ? "rounded-b-none" : ""}`}>
        <InputGroupInput
          placeholder="搜索音乐/MV/歌单/歌手"
          ref={inputRef}
          autoComplete="off"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon
          align="inline-end"
          className={`cursor-pointer ${keyword ? "visible" : "invisible"}`}
          onClick={() => setKeyword("")}
        >
          <CircleX />
        </InputGroupAddon>
      </InputGroup>

      <div
        className={`bg-card text-card-foreground absolute overflow-auto z-50 w-full top-9  transition duration-300 rounded-b-md ${
          open ? "block" : "hidden opacity-0"
        }`}
        style={{}}
      >
        <SearchOptions keyword={keyword} onSearch={onSearch} />
      </div>
    </div>
  );
}

function SearchOptions({ keyword, onSearch }: { keyword: string; onSearch: (word: string) => void }) {
  const { data, isLoading, error } = useSWR<string[]>(`/api/www/search/searchKey?key=${keyword}`);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    const res = keyword ? data.map(parseSearchResult) : data;
    return (
      <div className="text-left p-1">
        {keyword === "" && <li className="py-0.5">热门搜索:</li>}
        <ul>
          {res.map((item, i) => (
            <li
              className="py-0.5 flex gap-1 items-center rounded hover:bg-secondary"
              key={item + i}
              onClick={() => onSearch(item)}
            >
              <span className="w-6 h-6 text-center bg-accent rounded"> {i + 1} </span> {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}

//"RELWORD=周杰伦\r\nSNUM=3089862\r\nRNUM=1000\r\nTYPE=0",
function parseSearchResult(res: string) {
  const lines = res.split("\r\n");
  if (lines.length > 0) {
    const [, word] = lines[0].split("=");
    return word ?? "";
  }
  return res;
}

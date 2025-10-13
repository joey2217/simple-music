import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Music } from "../types";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "../store/player";

interface Props {
  items: Music[];
}

export default function MusicList({ items }: Props) {
  const { play } = usePlayerStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>name</TableHead>
          <TableHead>action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.rid}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Button onClick={() => play(item)}>play</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

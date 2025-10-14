import Pagination, { type PaginationProps } from "@/components/pagination";
import MusicList, { MusicListProps } from "./music-list";

type MusicPageProps = PaginationProps & MusicListProps;

export default function MusicPage({ items, height, ...props }: MusicPageProps) {
  return (
    <>
      <MusicList items={items} height={height} />
      <Pagination {...props} />
    </>
  );
}

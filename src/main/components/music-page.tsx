import Pagination, { type PaginationProps } from "@/components/pagination";
import MusicList, { MusicListProps } from "./music-list";

type MusicPageProps = PaginationProps & MusicListProps;

export default function MusicPage({ data, ...props }: MusicPageProps) {
  return (
    <>
      <MusicList data={data} />
      <Pagination {...props} />
    </>
  );
}

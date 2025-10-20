import MusicList from "@/main/components/music-list";
import { useLikeMusicStore } from "@/main/store/like";

export default function LikePage() {
  const list = useLikeMusicStore((s) => s.like);
  return <MusicList data={list} />;
}

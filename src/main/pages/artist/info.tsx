import { ArtistInfo } from "@/main/types/artist";
import { useParams } from "react-router";
import useSWR from "swr";

export default function ArtistInfoPage() {
  const { id } = useParams<"id">();
  const { data: artistInfo, isLoading, error } = useSWR<ArtistInfo>(`/api/www/artist/artist?artistid=${id}`);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (artistInfo) {
    return (
      <div>
        <h3 className="my-4">基本信息</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="label">姓名</span>
            <span
              dangerouslySetInnerHTML={{
                __html: artistInfo.name || "-",
              }}
            ></span>
          </div>
          <div>
            <span className="label">译名</span>
            <span
              dangerouslySetInnerHTML={{
                __html: artistInfo.aartist || "-",
              }}
            ></span>
          </div>
          <div>
            <span className="label">性别</span>
            <span>{artistInfo.gener}</span>
          </div>
          <div>
            <span className="label">国籍</span>
            <span>{artistInfo.country}</span>
          </div>
          <div>
            <span className="label">国籍</span>
            <span>{artistInfo.country}</span>
          </div>
          <div>
            <span className="label">出生地</span>
            <span>{artistInfo.birthplace}</span>
          </div>
          <div>
            <span className="label">语言</span>
            <span>{artistInfo.language}</span>
          </div>
          <div>
            <span className="label">生日</span>
            <span>{artistInfo.birthday}</span>
          </div>
          <div>
            <span className="label">星座</span>
            <span>{artistInfo.constellation}</span>
          </div>
          <div>
            <span className="label">身高</span>
            <span>{artistInfo.tall}</span>
          </div>
          <div>
            <span className="label">体重</span>
            <span>{artistInfo.weight}</span>
          </div>
        </div>
        <h3 className="my-4">个人简介</h3>
        <div dangerouslySetInnerHTML={{ __html: artistInfo.info }}></div>
      </div>
    );
  }

  return null;
}

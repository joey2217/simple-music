import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { DownloadStatus } from "src/renderer";
import { setting } from "@/main/lib/setting";
import { useDownloadStore } from "@/main/store/download";

const DOWNLOAD_STATUS: { [p in DownloadStatus]: string } = {
  init: "排队中",
  downloading: "下载中",
  completed: "完成",
  failed: "失败",
};

export default function Download() {
  const downloadList = useDownloadStore((s) => s.list);

  if (downloadList.length === 0) {
    return (
      <div className="h-[50vh] flex flex-col gap-4 items-center justify-center">
        <h2 className="text-xl font-semibold">暂无下载数据</h2>
        <Button onClick={() => window.electronAPI.openPath(setting.downloadDir)}>打开目录</Button>
      </div>
    );
  }

  return (
    <div className="page">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">#</TableHead>
            <TableHead className="max-w-96">标题</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {downloadList.map((d, index) => (
            <TableRow key={d.rid}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 max-w-96">
                  <img src={d.cover} alt={d.fileName} className="w-10 h-10 rounded-md" />
                  <div className="truncate flex-1">
                    <div className="truncate font-semibold text-base">{d.title}</div>
                    <div className="truncate">{d.artist}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={
                    d.status === "failed" ? "text-destructive" : d.status === "completed" ? "text-primary" : ""
                  }
                >
                  {DOWNLOAD_STATUS[d.status]}
                </span>
              </TableCell>
              <TableCell>
                <Button size="sm" onClick={() => window.electronAPI.showItemInFolder(d.downloadPath)}>
                  查看
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

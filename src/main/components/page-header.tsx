import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface Props {
  title?: React.ReactNode;
  backPath?: string;
}

export default function PageHeader({ title, backPath }: Props) {
  const navigate = useNavigate();
  const back = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="flex items-center mb-4">
      <button onClick={back} className="w-16 flex items-center gap-1 text-lg hover:text-primary">
        <ChevronLeft />
        <span>返回</span>
      </button>
      <div className="flex-1 text-center text-lg font-semibold">{title}</div>
      <div className="w-16 h-5"></div>
    </div>
  );
}

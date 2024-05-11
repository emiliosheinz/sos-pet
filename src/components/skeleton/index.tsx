import { Skeleton as SkeletonBase } from "~/components/ui/skeleton";

export function Skeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <SkeletonBase className="h-[306px] w-[390px] rounded-xl md:w-[672px]" />
      <SkeletonBase className="h-[306px] w-[390px] rounded-xl md:w-[672px]" />
      <SkeletonBase className="h-[306px] w-[390px] rounded-xl md:w-[672px]" />
    </div>
  );
}

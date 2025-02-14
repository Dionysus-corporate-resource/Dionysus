import { Skeleton } from "@/shared/components/ui/skeleton";

export default function SkeletonProposals() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex flex-row ex:flex-col gap-2 justify-between items-start">
        <div className="flex items-start gap-2">
          <Skeleton className="h-12 w-12" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ArrowUpRight } from "lucide-react";
import { BeerImage, PriceDisplay } from "../common";
import type { DraftBeer } from "../../types/beers.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DraftBeerCardProps {
  draft: DraftBeer;
  onEdit: (draft: DraftBeer) => void;
  onDelete: (draftId: number) => void;
  onApply?: (draft: DraftBeer) => void;
  isSelectionMode?: boolean;
}

export function DraftBeerCard({
  draft,
  onEdit,
  onDelete,
  onApply,
  isSelectionMode = false,
}: DraftBeerCardProps) {
  return (
    <Card className="group relative transition-all duration-200 h-full flex flex-col overflow-hidden">
      {/* 下書きバッジ - 右上に配置 */}
      <div className="absolute top-3 right-3 text-right z-10">
        <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
          Draft
        </span>
        <div className="text-xs font-semibold text-zinc-300 leading-none">
          下書き
        </div>
      </div>

      {/* Header Section */}
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3 pr-12">
          <BeerImage src={draft.image} alt={draft.name} size="small" />

          <div className="flex-1 min-w-0 space-y-1">
            <CardTitle className="text-sm font-bold tracking-tight line-clamp-1 text-zinc-900">
              {draft.name}
            </CardTitle>

            <p className="text-[11px] text-zinc-500 font-medium">
              <span className="text-zinc-700">
                {draft.brewery}
              </span>
              <span className="mx-1 opacity-40">•</span>
              {draft.location}
            </p>

            {/* スタイル・ABV・カラー */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-semibold text-zinc-600">
                {draft.style}
              </span>
              <span className="text-[10px] text-zinc-300">
                |
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                {draft.alcohol}%
              </span>
              {draft.color && (
                <>
                  <span className="text-[10px] text-zinc-300">
                    |
                  </span>
                  <span
                    className="inline-flex w-4 h-2.5 rounded-full ring-1 ring-black/5"
                    style={{ backgroundColor: draft.color }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="space-y-3 flex-1 flex flex-col pt-0">
        <p className="text-[13px] text-zinc-600 leading-relaxed line-clamp-2">
          {draft.description}
        </p>

        <div className="pt-3 border-t border-zinc-100">
          <PriceDisplay
            glassPrice={draft.price.glass}
            pintPrice={draft.price.pint}
            variant="compact"
          />
        </div>

        {/* Actions */}
        <div className="mt-auto pt-2">
          {isSelectionMode && onApply ? (
            <Button
              onClick={() => onApply(draft)}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              <ArrowUpRight className="h-4 w-4 mr-1" />
              反映する
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => onEdit(draft)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                編集
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    削除
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>下書きを削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                      この操作は取り消せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(draft.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      削除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

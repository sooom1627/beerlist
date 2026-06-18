import { Button } from "@/components/ui/button";
import { Edit2, Check, X, RefreshCcw, ArrowUpFromLine } from "lucide-react";
import type { Beer } from "../../types/beers.types";

interface BeerActionsProps {
  beer: Beer;
  onToggleAvailability: () => void;
  onToggleNew: () => void;
  onToggleEventBeer: () => void;
  onEdit: () => void;
  onReplace: () => void;
  onLoadFromDraft: () => void;
}

/**
 * ビールアクションボタン群コンポーネント
 * - 在庫切り替え
 * - 新着切り替え
 * - 編集
 * - 入れ替え
 * - 下書きから反映
 */
export function BeerActions({
  beer,
  onToggleAvailability,
  onToggleNew,
  onToggleEventBeer,
  onEdit,
  onReplace,
  onLoadFromDraft,
}: BeerActionsProps) {
  return (
    <div className="space-y-2 pt-2">
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={onToggleAvailability}
          variant={beer.isAvailable ? "outline" : "default"}
          size="sm"
          className="flex-1"
        >
          {beer.isAvailable ? (
            <>
              <X className="h-4 w-4 mr-1" />
              完売に変更
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-1" />
              販売に変更
            </>
          )}
        </Button>
        <Button onClick={onToggleNew} variant="outline" size="sm">
          {beer.isNew ? (
            <>
              <X className="h-4 w-4 mr-1" />
              Newを解除
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-1" />
              Newに変更
            </>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={onToggleEventBeer} variant="outline" size="sm" className="flex-1">
          {beer.isEventBeer ? (
            <>
              <X className="h-4 w-4 mr-1" />
              イベントを解除
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-1" />
              イベントに変更
            </>
          )}
        </Button>
        <Button onClick={onEdit} variant="outline" size="sm" className="flex-1">
          <Edit2 className="h-4 w-4 mr-1" />
          編集
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={onReplace} variant="destructive" size="sm" className="flex-1">
          <RefreshCcw className="h-4 w-4 mr-1" />
          入れ替え
        </Button>
        <Button onClick={onLoadFromDraft} variant="secondary" size="sm" className="flex-1">
          <ArrowUpFromLine className="h-4 w-4 mr-1" />
          下書きから反映
        </Button>
      </div>
    </div>
  );
}


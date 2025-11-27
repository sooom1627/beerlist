import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EmptySlotProps {
  slotIndex: number;
  onEdit: () => void;
  onLoadFromDraft: () => void;
}

/**
 * 空きスロット表示コンポーネント
 * スロット番号とビール追加ボタンを表示
 */
export function EmptySlot({ slotIndex, onEdit, onLoadFromDraft }: EmptySlotProps) {
  return (
    <Card className="border-dashed border-2 opacity-50">
      <CardHeader>
        <CardTitle className="text-sm">スロット {slotIndex + 1}</CardTitle>
        <CardDescription>空き</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={onEdit} variant="outline" className="w-full">
          ビールを追加
        </Button>
        <Button onClick={onLoadFromDraft} variant="secondary" className="w-full">
          下書きから追加
        </Button>
      </CardContent>
    </Card>
  );
}

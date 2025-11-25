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
}

/**
 * 空きスロット表示コンポーネント
 * スロット番号とビール追加ボタンを表示
 */
export function EmptySlot({ slotIndex, onEdit }: EmptySlotProps) {
  return (
    <Card className="border-dashed border-2 opacity-50">
      <CardHeader>
        <CardTitle className="text-sm">スロット {slotIndex + 1}</CardTitle>
        <CardDescription>空き</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onEdit} variant="outline" className="w-full">
          ビールを追加
        </Button>
      </CardContent>
    </Card>
  );
}

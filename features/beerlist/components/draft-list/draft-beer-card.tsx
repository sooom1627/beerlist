import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";

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
    <Card className="group relative transition-all duration-200 h-full flex flex-col">
      {/* Header Section (Matching BeerInfo structure) */}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start gap-3 flex-1 min-w-0 pt-2">
            <BeerImage
              src={draft.image}
              alt={draft.name}
              size="small"
            />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-semibold line-clamp-1">
                {draft.name}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {draft.brewery} / {draft.location}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-1">
                style: <span className="font-medium">{draft.style}</span> / alcohol:{" "}
                <span className="font-medium">{draft.alcohol}%</span>
              </p>
            </div>
          </div>
          {/* Badge area if needed, currently empty to match spacing */}
        </div>
      </CardHeader>

      {/* Content Section (Matching BeerSlotCard structure) */}
      <CardContent className="space-y-3 flex-1 flex flex-col">
        <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
          {draft.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <PriceDisplay
            glassPrice={draft.price.glass}
            pintPrice={draft.price.pint}
            variant="compact"
          />
        </div>

        {/* Actions (Matching BeerActions positioning) */}
        <div className="mt-auto pt-2">
           {isSelectionMode && onApply ? (
             <Button onClick={() => onApply(draft)} variant="secondary" size="sm" className="w-full">
               <ArrowUpRight className="h-4 w-4 mr-1" />
               反映する
             </Button>
           ) : (
             <div className="grid grid-cols-2 gap-2">
               <Button onClick={() => onEdit(draft)} variant="outline" size="sm" className="flex-1">
                 <Edit2 className="h-4 w-4 mr-1" />
                 編集
               </Button>
               <AlertDialog>
                 <AlertDialogTrigger asChild>
                   <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10">
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
                     <AlertDialogAction onClick={() => onDelete(draft.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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





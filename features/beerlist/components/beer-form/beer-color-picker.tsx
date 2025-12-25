import React, { useState, useEffect } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import type { BeerFormData } from "../../types/beer-form.types";

// 通常のビールカラー（SRMベース）
const PRESET_COLORS = [
  { label: "Wheat", value: "#F3E5AB" },
  { label: "IPA", value: "#FFD700" },
  { label: "Ale", value: "#B5651D" },
  { label: "Stout", value: "#2F1B1B" },
];

// SRM (Standard Reference Method) Color Approximation
// 1-40 scale
const SRM_COLORS: { [key: number]: string } = {
  1: "#FFE699",
  2: "#FFD878",
  3: "#FFCA5A",
  4: "#FFBF42",
  5: "#FBB123",
  6: "#F8A600",
  7: "#F39C00",
  8: "#EA8F00",
  9: "#E58500",
  10: "#DE7C00",
  11: "#D77200",
  12: "#CF6900",
  13: "#CB6200",
  14: "#C35900",
  15: "#BB5100",
  16: "#B54C00",
  17: "#B04500",
  18: "#A63E00",
  19: "#A13700",
  20: "#9B3200",
  21: "#952D00",
  22: "#8E2900",
  23: "#882300",
  24: "#821E00",
  25: "#7B1A00",
  26: "#771900",
  27: "#701400",
  28: "#6A0E00",
  29: "#660D00",
  30: "#5E0B00",
  31: "#5A0A02",
  32: "#600903",
  33: "#520907",
  34: "#4C0505",
  35: "#470606",
  36: "#420607",
  37: "#3D0708",
  38: "#370607",
  39: "#2D0607",
  40: "#1F0506",
};

interface BeerColorPickerProps {
  register: UseFormRegister<BeerFormData>;
  errors: FieldErrors<BeerFormData>;
  setValue: UseFormSetValue<BeerFormData>;
  watch: UseFormWatch<BeerFormData>;
}

export const BeerColorPicker = ({
  register,
  errors,
  setValue,
  watch,
}: BeerColorPickerProps) => {
  const selectedColor = watch("color");
  const [customSrm, setCustomSrm] = useState<number>(5);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [isFreePickerMode, setIsFreePickerMode] = useState(false);

  // フォームの値が変更されたら、それがプリセット/SRM/フリーかを判定する
  useEffect(() => {
    if (!selectedColor) {
      setIsCustomMode(false);
      setIsFreePickerMode(false);
      return;
    }

    const isPreset = PRESET_COLORS.some((p) => p.value === selectedColor);
    const srmEntry = Object.entries(SRM_COLORS).find(
      ([_, color]) => color.toLowerCase() === selectedColor.toLowerCase()
    );

    if (isPreset) {
      setIsCustomMode(false);
      setIsFreePickerMode(false);
    } else if (srmEntry) {
      setIsCustomMode(true);
      setIsFreePickerMode(false);
      setCustomSrm(Number(srmEntry[0]));
    } else {
      // プリセットにもSRMにもない場合はフリーピッカーモード
      setIsCustomMode(false);
      setIsFreePickerMode(true);
    }
  }, [selectedColor]);

  const handlePresetClick = (color: string) => {
    // 選択済みの色をクリックした場合は解除する
    const newValue = selectedColor === color ? null : color;
    setValue("color", newValue, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setIsCustomMode(false);
    setIsFreePickerMode(false);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const srm = Number(e.target.value);
    setCustomSrm(srm);
    const color = SRM_COLORS[srm];
    setValue("color", color, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setIsCustomMode(true);
    setIsFreePickerMode(false);
  };

  const handleFreeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setValue("color", color, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setIsCustomMode(false);
    setIsFreePickerMode(true);
  };

  return (
    <div className="space-y-3">
      <Label>Beer Color</Label>

      {/* プリセット＋フリーピッカー */}
      <div className="flex flex-wrap gap-3 items-center">
        {PRESET_COLORS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => handlePresetClick(preset.value)}
            className={cn(
              "w-9 h-9 rounded-full border-2 transition-all relative flex items-center justify-center",
              selectedColor === preset.value &&
                !isCustomMode &&
                !isFreePickerMode
                ? "border-primary ring-2 ring-primary ring-offset-2 scale-110"
                : "border-gray-200 hover:border-gray-400 hover:scale-105"
            )}
            style={{ backgroundColor: preset.value }}
            title={preset.label}
          >
            {selectedColor === preset.value &&
              !isCustomMode &&
              !isFreePickerMode && (
                <span className="text-primary-foreground font-bold drop-shadow-md text-sm">
                  ✓
                </span>
              )}
            <span className="sr-only">{preset.label}</span>
          </button>
        ))}

        {/* フリーカラーピッカー */}
        <div className="relative w-9 h-9">
          {/* 表示用のボタン風要素 */}
          <div
            className={cn(
              "w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center",
              "bg-white",
              isFreePickerMode
                ? "border-primary ring-2 ring-primary ring-offset-2 scale-110"
                : "border-dashed border-gray-300 hover:border-gray-400 hover:scale-105"
            )}
            title="自由選択"
          >
            {isFreePickerMode ? (
              <div
                className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                style={{ backgroundColor: selectedColor || "#888" }}
              />
            ) : (
              <Palette className="w-4 h-4 text-gray-400" />
            )}
          </div>
          {/* 透明なinputをオーバーレイ */}
          <input
            type="color"
            value={selectedColor || "#FFD700"}
            onChange={handleFreeColorChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="カスタムカラー選択"
          />
        </div>
      </div>

      {/* SRMスライダー（微調整用） */}
      <div className="space-y-2 p-3 border rounded-lg bg-slate-50">
        <div className="flex items-center justify-between">
          <Label htmlFor="srm-slider" className="text-xs text-muted-foreground">
            SRMスケール（微調整）
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">
              SRM: {customSrm}
            </span>
            <div
              className={cn(
                "w-6 h-6 rounded-full border shadow-sm transition-all",
                isCustomMode &&
                  !isFreePickerMode &&
                  "ring-2 ring-primary ring-offset-1"
              )}
              style={{ backgroundColor: SRM_COLORS[customSrm] }}
            />
          </div>
        </div>
        <div className="relative h-6 w-full rounded-full overflow-hidden border border-gray-200">
          {/* Gradient Background */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `linear-gradient(to right, 
                 ${SRM_COLORS[1]} 0%, 
                 ${SRM_COLORS[10]} 25%, 
                 ${SRM_COLORS[20]} 50%, 
                 ${SRM_COLORS[30]} 75%, 
                 ${SRM_COLORS[40]} 100%)`,
            }}
          />
          <input
            id="srm-slider"
            type="range"
            min="1"
            max="40"
            step="1"
            value={customSrm}
            onChange={handleCustomChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Beer Color Slider"
          />
        </div>
      </div>

      <input type="hidden" {...register("color")} />
      {errors.color && (
        <p className="text-sm text-red-500">{errors.color.message}</p>
      )}
    </div>
  );
};

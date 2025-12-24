import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { BeerColorPicker } from "../beer-color-picker";
import { BeerFormData } from "../../../types/beer-form.types";

const TestComponent = () => {
  const { register, formState: { errors }, setValue, watch } = useForm<BeerFormData>({
    defaultValues: {
      color: "",
    },
  });

  return (
    <form>
      <BeerColorPicker
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />
      <div data-testid="selected-color">{watch("color") || "none"}</div>
    </form>
  );
};

describe("BeerColorPicker", () => {
  it("should render presets, free picker, and srm slider", () => {
    render(<TestComponent />);
    
    // 通常カラープリセット
    expect(screen.getByTitle("Wheat")).toBeInTheDocument();
    expect(screen.getByTitle("IPA")).toBeInTheDocument();
    expect(screen.getByTitle("Ale")).toBeInTheDocument();
    expect(screen.getByTitle("Stout")).toBeInTheDocument();
    
    // フリーピッカーボタン
    expect(screen.getByTitle("自由選択")).toBeInTheDocument();
    
    // SRMスライダー
    expect(screen.getByLabelText("SRMスケール（微調整）")).toBeInTheDocument();
    expect(screen.getByLabelText("Beer Color Slider")).toBeInTheDocument();
  });

  it("should update form value when preset is clicked", async () => {
    render(<TestComponent />);
    
    const ipaButton = screen.getByTitle("IPA");
    fireEvent.click(ipaButton);

    await waitFor(() => {
        expect(screen.getByTestId("selected-color")).toHaveTextContent("#FFD700");
    });
  });

  it("should update form value when slider is moved", async () => {
    render(<TestComponent />);
    
    const slider = screen.getByLabelText("Beer Color Slider");
    fireEvent.change(slider, { target: { value: "40" } }); // Max SRM ~ Black

    await waitFor(() => {
        // SRM 40 is #1F0506 in our map
        expect(screen.getByTestId("selected-color")).toHaveTextContent("#1F0506");
    });
  });

  it("should toggle off when clicking selected preset again", async () => {
    render(<TestComponent />);
    
    const ipaButton = screen.getByTitle("IPA");
    
    // Select
    fireEvent.click(ipaButton);
    await waitFor(() => {
        expect(screen.getByTestId("selected-color")).toHaveTextContent("#FFD700");
    });
    
    // Deselect
    fireEvent.click(ipaButton);
    await waitFor(() => {
        expect(screen.getByTestId("selected-color")).toHaveTextContent("none");
    });
  });
});

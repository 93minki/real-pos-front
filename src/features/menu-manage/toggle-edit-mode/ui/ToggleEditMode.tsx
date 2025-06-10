"use clinet";

import { Toggle } from "@/components/ui/toggle";
import { Settings } from "lucide-react";

interface ToggleEditModeProps {
  isEditMode: boolean;
  onToggle: (isEditMode: boolean) => void;
}

export const ToggleEditMode = ({
  isEditMode,
  onToggle,
}: ToggleEditModeProps) => {
  return (
    <Toggle variant={"default"} pressed={isEditMode} onPressedChange={onToggle}>
      <Settings className="w-6 h-6" />
    </Toggle>
  );
};

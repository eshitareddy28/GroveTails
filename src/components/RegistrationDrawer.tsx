"use client";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FormType } from "./forms/type";
import { PetRegistrationForm } from "./forms/PetRegistrationForm";
import { ShelterRegistrationForm } from "./forms/ShelterRegistrationForm";

interface RegistrationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formType: FormType;
}

export const RegistrationDrawer = ({
  open,
  onOpenChange,
  formType,
}: RegistrationDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent
        className="h-screen top-0 right-0 left-auto mt-0 w-[600px] rounded-none p-0"
        hideHandle
        hideTitle
      >
        {/* Hidden accessibility title */}
        <span className="sr-only">
          {formType === "pet" ? "Pet Registration" : "Shelter Registration"}
        </span>

        <div className="flex flex-col h-full overflow-y-auto">
          {formType === "pet" ? (
            <PetRegistrationForm
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          ) : (
            <ShelterRegistrationForm
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

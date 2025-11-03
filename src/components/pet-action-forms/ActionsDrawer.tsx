"use client";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FormType } from "./type";
import { PetRegistrationForm } from "../forms/PetRegistrationForm";
import { ShelterRegistrationForm } from "../forms/ShelterRegistrationForm";
import { PetActionForm } from "./PetActionsForm";

interface RegistrationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formType: FormType;
  petName?: string;
}

export const ActionsDrawer = ({
  open,
  onOpenChange,
  formType,
  petName = "",
}: RegistrationDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[600px] rounded-none p-0">
        <div className="flex flex-col h-full overflow-y-auto mt-0">
          {formType === "pet" ? (
            <PetRegistrationForm
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          ) : formType === "shelter" ? (
            <ShelterRegistrationForm
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          ) : formType === "adopt" ? (
            <PetActionForm
              variant="adopt"
              petName={petName}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          ) : formType === "foster" ? (
            <PetActionForm
              variant="foster"
              petName={petName}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          ) : (
            <PetActionForm
              variant="sponsor"
              petName={petName}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

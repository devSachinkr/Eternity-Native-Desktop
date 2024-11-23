import { useLayout } from "@/hooks/use-layout";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";
import { X } from "lucide-react";
import React from "react";
import EternityLogo from "../../public/assets/logo.svg";
interface Props {
  children: React.ReactNode;
  className?: string;
}

export const ControlLayout = ({ children, className }: Props) => {
  const { isVisible, onClose } = useLayout();
  return (
    <div
      className={cn(
        " bg-[#171717] flex px-1  flex-col rounded-3xl  overflow-hidden",
        className,
        isVisible && "invisible"
      )}
    >
      <div className="draggable flex justify-between items-center p-3 ">
        <span className="non-draggable">
          <UserButton />
        </span>
        <X
          size={20}
          className="text-gray-400 non-draggable hover:text-white cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="flex-1 h-0 overflow-auto">
        {children}
      </div>
      <div className="p-5 flex w-full">
          <div className="flex w-full gap-x-2 items-center">
            <img src={EternityLogo} alt="App Logo"width={50} height={50}/>
            <p className="text-white text-2xl font-bold">Eternity</p>
          </div>
        </div>
    </div>
  );
};

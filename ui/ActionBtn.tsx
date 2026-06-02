import React from "react";

interface ActionBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export const ActionBtn = ({
  children,
  icon,
  variant = "primary",
  className = "",
  ...props
}: ActionBtnProps) => {
  const baseClasses = "flex justify-center items-center gap-2 font-label-md text-label-md py-3 rounded-lg transition-colors w-full";

  const variants = {
    primary: "bg-[#FFE082] text-[#3E2723] hover:bg-[#FFB300]", // Using accent colors from GUIDELINES
    secondary: "bg-[#FFFFFF] border border-outline-variant text-[#3E2723] hover:bg-surface-variant"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
      {children}
    </button>
  );
};

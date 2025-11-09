"use client";

import { Shield, Users } from "lucide-react";

interface ToggleRoleProps {
  value: "USER" | "ADMIN";
  onChange: (value: "USER" | "ADMIN") => void;
  disabled?: boolean;
}

export const ToggleRole = ({ value, onChange, disabled = false }: ToggleRoleProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
      <div className="flex gap-2">
        <button type="button" onClick={() => onChange("USER")} disabled={disabled} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${value === "USER" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
          <Users size={18} />
          <span>User</span>
        </button>
        <button type="button" onClick={() => onChange("ADMIN")} disabled={disabled} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${value === "ADMIN" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
          <Shield size={18} />
          <span>Admin</span>
        </button>
      </div>
    </div>
  );
};

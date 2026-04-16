import React from "react";

type UserProfileProps = {
  name: string;
  role: string;
};

const UserProfile = ({ name, role }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
        CR
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        <p className="text-xs text-slate-500">{role}</p>
      </div>
    </div>
  );
};

export default UserProfile;
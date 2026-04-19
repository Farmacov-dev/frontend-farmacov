import UserAvatar from "./UserAvatar";

interface UserProfileProps {
  userName?: string;
  userRole?: string;
  collapsed?: boolean;
}

const UserProfile = ({
  userName = "Caro Ramirez",
  userRole = "Director de finanzas",
  collapsed = false,
}: UserProfileProps) => {
  return (
    <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3 px-1"}`}>
      <UserAvatar userName={userName} />

      {!collapsed && (
        <div className="leading-tight">
          <p className="text-sm font-semibold text-[#111827]">{userName}</p>
          <p className="mt-1 text-[11px] text-[#7B7B7B]">{userRole}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
interface UserAvatarProps {
  userName?: string;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const UserAvatar = ({ userName = "Caro Ramirez" }: UserAvatarProps) => {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#4F7EF7] to-[#27C3A8] text-base font-bold text-white">
      {getInitials(userName)}
    </div>
  );
};

export default UserAvatar;
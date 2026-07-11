import { useState } from "react";

const sizeClasses = {
  xs: "h-7 w-7 text-[10px] rounded-full",
  sm: "h-8 w-8 text-xs rounded-full",
  md: "h-12 w-12 text-sm rounded-2xl",
  lg: "h-16 w-16 text-xl rounded-2xl",
  xl: "h-20 w-20 text-2xl rounded-2xl",
};

export default function ProfileAvatar({
  photoUrl,
  initials,
  size = "md",
  className = "",
  alt = "Profile photo",
}) {
  const [imageError, setImageError] = useState(false);
  const showPhoto = Boolean(photoUrl) && !imageError;

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-amber-500 font-bold text-slate-950 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {showPhoto ? (
        <img
          src={photoUrl}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        initials
      )}
    </div>
  );
}

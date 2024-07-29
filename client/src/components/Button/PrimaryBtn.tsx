type buttonProps = {
  title: string;
  type: ButtonHTMLAttributes;
  icon?: HTMLImageElement;
  onClick?: () => void;
};

export default function PrimaryBtn({
  title,
  type,
  icon,
  onClick,
}: buttonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full flex-1 bg-gradient-btn-primary rounded-md text-sm text-white font-medium p-3 flex items-center gap-2 justify-center cursor-pointer"
    >
      <span>{title}</span>
      {icon && (
        <span>
          <img src={icon?.src} alt="create new task" className="w-6 h-6" />
        </span>
      )}
    </button>
  );
}

export default function PrimaryBtn({ title, type, icon, onClick }) {
  return (
    <div onClick={onClick} className="bg-gradient-btn-primary rounded-md text-sm text-white font-medium p-3 flex items-center gap-2 justify-center cursor-pointer">
      <button type={type}>{title}</button>
      {icon && (
        <span>
          <img src={icon?.src} alt="create new task" className="w-6 h-6" />
        </span>
      )}
    </div>
  );
}

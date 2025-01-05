interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black transform transition-all ease-in-out duration-300 z-[100] ${
        isOpen
          ? "opacity-50 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
      onClick={onClose}
    ></div>
  );
};

export default Overlay;

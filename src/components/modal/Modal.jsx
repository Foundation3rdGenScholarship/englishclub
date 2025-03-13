import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const Modal = ({
  isOpen,
  onClose,
  children,
  title ,
  onAccept,
}) => {
  if (!isOpen) return null;

  const handleAccept = () => {
    if (onAccept) {
      onAccept(); // Trigger any additional logic for accepting the policy
    }
    onClose(); // Close the modal
  };
 const { t } = useTranslation("register");
  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose} // Close modal when clicking outside
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-4 relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b border-primary-500 pb-3 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto max-h-[60vh] text-gray-600 dark:text-gray-400">
            {children}
          </div>

          {/* Modal Footer */}
          <div className="mt-6 text-right">
            <button
              onClick={handleAccept} // Use the handleAccept function
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
            >
              {t("Accept")}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;

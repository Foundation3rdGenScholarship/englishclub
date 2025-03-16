const GlassCard = ({ children, className }) => {
  return (
    <div
      className={`p-6 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white dark:border-none border-white/20 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;

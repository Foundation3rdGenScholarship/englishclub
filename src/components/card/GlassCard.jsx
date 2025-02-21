const GlassCard = ({ children, className }) => {
  return (
    <div
      className={`p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;

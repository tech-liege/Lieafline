function ProgressBar({ value = 0, disabled = false, showPer = true }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full">
      <div
        className={
          "h-2 w-full columns-auto rounded " +
          (disabled ? " bg-gray-400" : " bg-[#37464F]")
        }
      >
        <div
          className={
            "h-2 max-w-full min-w-4 rounded columns-auto transition-[width] duration-500 " +
            (disabled ? " bg-gray-500" : " bg-emerald-500")
          }
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showPer && (
        <div className="mt-1 text-right text-xs text-gray-500">{clamped}%</div>
      )}
    </div>
  );
}

export default ProgressBar;

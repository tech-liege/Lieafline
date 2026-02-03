export default function BackgroundOverlay({
  position = "fixed",
  grad = false,
  dir = "r",
  className = "",
}) {
  return (
    <div
      className={
        (position === "fixed"
          ? position + " h-[100vh] "
          : position + " h-full ") +
        " z-300 w-full " +
        (grad
          ? " bg-gradient-to-" + dir + " from-transparent to-gray-300"
          : " bg-[#0000003c] ") +
        className
      }
    ></div>
  );
}

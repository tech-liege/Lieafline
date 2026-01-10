export default function BackgroundOverlay({ className = "" }) {
  return (
    <div
      className={
        "z-50 bg-black opacity-40 fixed h-[100vh] w-full  " + className
      }
    ></div>
  );
}

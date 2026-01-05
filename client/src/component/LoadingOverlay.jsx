import { useVar } from "../hooks/useAuth";

export default function LoadingOverlay() {
  const { loadingText } = useVar();
  return (
    <>
      <div className="z-50 bg-black opacity-40 fixed h-[100vh] w-full cursor-wait"></div>
      <div className="fixed z-60 w-15 h-15 border-4 border-gray-500 border-t-white rounded-4xl mx-[48vw] my-[45vh] animate-spin duration-75"></div>
      <div className="fixed z-60 text-white text-3xl text-center w-full mt-[20vh] ">
        {loadingText}
      </div>
    </>
  );
}

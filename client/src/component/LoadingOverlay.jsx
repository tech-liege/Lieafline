import { useVar } from "../hooks/useAuth";
import BackgroundOverlay from "./BackgroundOverlay";

export default function LoadingOverlay() {
  const { loadingText } = useVar();
  return (
    <>
      <BackgroundOverlay />
      <div className="fixed z-301 w-15 h-15 border-4 border-gray-500 border-t-white rounded-4xl mx-[48vw] my-[45vh] animate-spin duration-75"></div>
      <div className="fixed z-301 text-white text-3xl text-center w-full mt-[20vh] ">
        {loadingText}
      </div>
    </>
  );
}

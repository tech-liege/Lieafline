export default function LoadingOverlay() {
  return (
    <>
      <div className='z-50 bg-black opacity-40 fixed h-[100vh] w-full'></div>
      <div className='fixed z-60 w-8 h-8 bg-white mx-[48vw] my-[45vh] loading-spinner'></div>
    </>
  );
}

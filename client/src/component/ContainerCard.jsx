export default function ContainerCard({ header, body }) {
  return (
    <div className="bg-white border-[1.5px] border-gray-300 rounded-lg shadow-md min-h-32">
      <div className="border-b-[1.5px] border-inherit w-full text-2xl font-semibold p-2 pl-4">
        {header}
      </div>
      <div className="">{body}</div>
    </div>
  );
}

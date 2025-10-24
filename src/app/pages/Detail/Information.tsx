import type { DynamicKeyObject } from "../../../interface/app";

interface InformationProps {
  place: DynamicKeyObject;
}

const Information = (props: InformationProps) => {
  const { place } = props;
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="text-[20px] font-bold">Tổng quan</div>
        <a
          href={place.link}
          target="_blank"
          rel="noopener noreferrer"
          className="break-words whitespace-normal text-blue-600 underline"
        >
          {place.link}
        </a>
      </div>
    </>
  );
};
export default Information;

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="border-b my-8 py-2">
      <div className="text-4xl font-bold leading-10">{title}</div>
      <div className="text-slate-600 font-light text-justify mt-4">
        {description}
      </div>
    </div>
  );
};
export default Heading;

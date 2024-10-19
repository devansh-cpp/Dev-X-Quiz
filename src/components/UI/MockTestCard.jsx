import { NavLink, useNavigate } from "react-router-dom";

const MockTestCard = ({
  imageUrl,
  subtitle,
  title,
  category,
  buttonText,
  bgColor,
}) => {
  const navigate = useNavigate();
  const categoryClick = (category) => {
    navigate(`/quiz?category=${encodeURIComponent(category)}`);
  };

  return (
    <div
      className={`flex-shrink-0 m-6 flex justify-center items-center flex-col relative overflow-hidden ${bgColor} rounded-lg max-w-xs shadow-lg group`}
    >
      <svg
        className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform"
        viewBox="0 0 375 283"
        fill="none"
        style={{ opacity: 0.1 }}
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
        <div
          className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
          style={{
            background: "radial-gradient(black, transparent 60%)",
            transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
            opacity: 0.2,
          }}
        ></div>
        <img className="relative w-40" src={imageUrl} alt={title} />
      </div>
      <div className="relative text-white text-center  px-6 pb-6 mt-6">
        <span className="block opacity-75 -mb-1">{subtitle}</span>
        <span className="block font-semibold  text-lg">{title}</span>
        
          <button className="bg-white rounded-full hover:bg-purple-500 hover:text-white hover:text-semibold duration-300 text-purple-500 text-xs font-bold my-3 px-3 py-2"
          onClick={()=>categoryClick(category)}>
            {buttonText}
          </button>
        
      </div>
    </div>
  );
};

export default MockTestCard;

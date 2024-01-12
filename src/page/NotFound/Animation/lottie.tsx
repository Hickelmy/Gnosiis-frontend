import Lottie from "react-lottie";
import animationData from "../Animation/notfoundpage.json";

export const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={720} />
    </div>
  );
};
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react";
import { useNavigate} from "react-router-dom";
import thumbs from "../assets/thumbs.json"
import sparkle from "../assets/sparkle.json"


const Order = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      navigate("/home")
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationComplete) {
      navigate("/home");
    }
  }, [animationComplete, navigate]);
  const defaultOptions = {
    loop: false, // or false depending on whether you want the animation to loop
    autoplay: true,
    animationData: thumbs,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptions1 = {
    loop: false, // or false depending on whether you want the animation to loop
    autoplay: true,
    animationData: sparkle,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div 
    className="bg-white mt-24 flex-1">
      <LottieView
        
        
        height={400}
        width={400}
       options = {defaultOptions}
        speed={0.7}
        onComplete={() => setAnimationComplete(true)}
      />
      <div
        
        className="text-center text-3xl font-semibold mt-16"
      >
        Your Order Has been Received
      </div>
      <LottieView
        
        
        height={400}
        width={400}
        options = {defaultOptions1}
        speed={0.7}
        onComplete={() => setAnimationComplete(true)}
      />
    </div>
  );
};

export default Order;

import TiltText from "@/components/TiltText";
import { useRef, useState, useEffect } from "react";
import Page1bottom from "@/components/Page1bottom";

const gsapPromise = import("gsap").then((module) => module.default);

const Page1 = ()=>{
const tiltTextRef = useRef<any>(null);
  const [xVal, setXVal] = useState(0);
  const [yVal, setYVal] = useState(0);

  const mouseMoveHandle = (e: any) => {
    setXVal(
      (e.clientX - 
        tiltTextRef.current.getBoundingClientRect().x - 
        tiltTextRef.current.getBoundingClientRect().width) / 12
    );
    setYVal(
      -(e.clientY - 
        tiltTextRef.current.getBoundingClientRect().y - 
        tiltTextRef.current.getBoundingClientRect().height) / 5
    );
  };

  useEffect(() => {
    gsapPromise.then((gsap) => {
      gsap.to(tiltTextRef.current, {
        transform: `rotateX(${yVal}deg) rotateY(${xVal}deg)`,
        duration: 2,
      });
    });
  }, [xVal, yVal]);
  return (
    <div className=" relative h-[45vw] text-white bg-white p-4">
      <div className="page1 relative lg:h-full sm:h-screen lg:w-full sm:w-[ ]  rounded-[35px]">
      <div className="absolute top-[5%] left-[3%]">
        <h1 className=" text-white text-6xl tracking-tighter font-semibold">
          Moid
        </h1>
        <div className="w-[9.4vw] my-1 ml-1 h-[1px] bg-white "></div>
      </div>
        <div className="flex justify-between items-center h-full px-12">
        <div
          onMouseMove={(e) => {
            mouseMoveHandle(e);
          }}
          id="page1-child"
          className="uppercase flex ml-8 h-full items-center"
        >
          <TiltText ref={tiltTextRef} />
        </div>
        <div>
        <video
            autoPlay
            muted
            loop
            className="h-[28vw] mr-16"
            src="/sigma.webm"
          />
        </div>
        <Page1bottom />
        </div>
      </div>
    </div>
  )
};
export default Page1
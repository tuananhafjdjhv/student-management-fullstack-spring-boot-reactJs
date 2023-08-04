import React from "react";

export const LoadingImage = () => {
  return (
    <div className="w-screen h-screen backdrop-blur-sm bg-white/30 fixed top-0 left-0 z-[999999]">
      <div className="w-full h-full flex items-center justify-center">
        <img
          className="w-[50%]"
          src="https://firebasestorage.googleapis.com/v0/b/demo3-895a5.appspot.com/o/images%2FloadingGifHello.gif?alt=media&token=7d5eada5-a044-45d3-a629-142508ae51f3"
          alt=""
        />
      </div>
    </div>
  );
};

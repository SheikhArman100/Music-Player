import React from "react";

function Button({ icon, title, effect }) {
  return (
    <div className="group relative inline-flex flex-col items-center space-y-2 p-1">
      <button type="button" className={effect}>
        {icon}
      </button>
      <div className="absolute top-full z-50 hidden flex-col  items-center rounded bg-white py-2 px-5 opacity-80 transition delay-500 duration-500 ease-in-out group-hover:flex">
        <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded bg-white" />
        <p className="text-lg font-semibold text-black">{title}</p>
      </div>
    </div>
  );
}

export default Button;

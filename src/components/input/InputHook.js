import React from "react";
import { useController } from "react-hook-form";

const InputHook = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  //   console.log(field);
  return (
    <input
      type="text"
      className="p-3 transition-all bg-white border border-blue-500 rounded-lg outline-none focus:"
      {...field}
      {...props}
    />
  );
};

export default InputHook;

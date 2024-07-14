// import { ChangeEvent } from "react";

// import styles from "./FormLabel.module.css";

// type Props = {
// 	className?: string;
// 	htmlFor: string;
// 	label: string;
// 	type: string;
// 	id: string;
// 	required: boolean;
// 	maxLength: number;
// 	minLength: number;
// 	value?: string;
// 	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
// 	inputPH?: string;
// 	labelPH?: string;
//     name:string
// };

// const FormLabel = (props: Props) => {
// 	return (
// 		<div className={`${styles.label} ${props.className}`}>
// 			<label htmlFor={props.htmlFor} placeholder={props.labelPH}>
// 				{props.label}
// 			</label>
// 			<input
// 				type={props.type}
// 				id={props.id}
//                 name={props.name}
// 				required={props.required}
// 				maxLength={props.maxLength}
// 				minLength={props.minLength}
// 				value={props.value}
// 				onChange={props.onChange}
// 				placeholder={props.inputPH}
// 				className="placeholder-black text-black p-2 border rounded-md"
// 			/>
// 		</div>
// 	);
// };

// export default FormLabel;


import React, { ChangeEvent } from "react";
import styles from "./FormLabel.module.css";

type Props = {
  className?: string;
  htmlFor: string;
  label: string;
  type: string;
  id: string; // Add 'id' prop here
  name: string;
  required: boolean;
  maxLength: number;
  minLength: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputPH?: string;
  errorMessage?: string;
  validate?: (value: string) => boolean;
};

const FormLabel = ({
  className,
  htmlFor,
  label,
  type,
  id, // Ensure 'id' is part of Props
  name,
  required,
  maxLength,
  minLength,
  onChange,
  inputPH,
  errorMessage,
  validate,
}: Props) => {
  const handleValidation = (value: string): boolean => {
    if (validate) {
      return validate(value); // Custom validation function provided
    }
    return true; // No custom validation defined, so default to true
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event); // Pass the event up to parent component
  };

  return (
    <div className={`${styles.label} ${className}`}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        id={id} // Ensure 'id' attribute matches prop
        name={name}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={inputPH}
        onChange={handleChange}
        className="placeholder-black text-black p-2 border rounded-md"
      />
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
    </div>
  );
};

export default FormLabel;

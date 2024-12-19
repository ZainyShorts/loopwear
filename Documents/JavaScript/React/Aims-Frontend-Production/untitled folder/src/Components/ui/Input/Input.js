

import clsx from "clsx";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

// interface InputProps {
//   label: string;
//   id: string;
//   type?: string;
//   required?: boolean;
//   value: string;
//   disabled?: boolean;
//   change?: any;
//   tag?:boolean;
//   showEyeIcon?:string
//   iconChange?:any
//   placeholder:string
// }

const Input = ({
  label,
  id,
  value,
  required,
  type = 'text',
  disabled,
  showEyeIcon = 'default',
  iconChange,
  change,
  tag,
  placeholder
}) => {
    function showHidetogglebtn()
    {
        if(showEyeIcon == 'closeEye')
        {
            iconChange('showEye')
        }else{
            iconChange('closeEye')
        }
    }
  return ( 
    <div>

 { showEyeIcon == 'showEye' ? <div className="flex">
      <label 
        htmlFor={id} 
        className="
        block 
        text-sm 
        font-medium 
        leading-6 
        text-[#b7bac1]
        "
        >
        {label} 
      </label>
          <div  className="mt-1 ml-2">
            <FaEye onClick={showHidetogglebtn} className="cursor-pointer"  />
            </div>
    </div>
    : showEyeIcon == 'closeEye' ?
    <div className="flex">
      <label 
        htmlFor={id} 
        className="
        block 
        text-sm 
        font-medium 
        leading-6 
        text-[#b7bac1]
        "
        >
        {label} 
      </label>
          <div className="mt-1 ml-2">
            <FaRegEyeSlash  className="cursor-pointer" onClick={showHidetogglebtn}/>
            </div>
    </div>: <label 
        htmlFor={id} 
        className="
        block 
        text-sm 
        font-medium 
        leading-6 
        text-[#b7bac1]
        "
        >
        {label} 
      </label>}


      <div className="mt-2">
       {tag ? <textarea
          id={id}
          rows={5}
          onChange={(e)=>change(e.target.value)}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          required={required}
          className={clsx(`
            form-input
            block 
            w-full 
            rounded-md 
            pl-2
            border-2 
            py-1.5 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-900 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-[#151c2c]
            outline-none
            border:ring-sky-600
            sm:text-sm 
            sm:leading-6`,
            disabled && 'opacity-50 cursor-default'
            )}
        />
        :<input
        id={id}
        type={type}
        onChange={(e)=>change(e.target.value)}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        required={required}
        className={clsx(`
          form-input
          block 
          w-full 
          rounded-md 
          pl-2
          border-2 
          py-1.5 
          text-gray-900 
          shadow-sm 
          ring-1 
          ring-inset 
          ring-gray-300 
          placeholder:text-gray-900 
          focus:ring-2 
          focus:ring-inset 
          focus:ring-[#151c2c]
          outline-none
          border:ring-sky-600
          sm:text-sm 
          sm:leading-6`,
          disabled && 'opacity-50 cursor-default'
          )}
      />}
      </div>
    </div>
   );
}
 
export default Input;
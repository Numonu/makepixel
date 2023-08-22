import {useState} from "react";

type InputTypes = {
    placeholder:string
    type?:string
}

export default function Input({type = "text" , placeholder}:InputTypes){

    const [focus , setFocus] = useState(false);

    const on = () => setFocus(true);
    const off = () => setFocus(false);

    return <label htmlFor={placeholder + "_"} className={`pb-1 px-2 flex gap-2 border-b transition-colors ${focus && "border-primary"}`} onFocus={on} onBlur={off}>
        <span className={`capitalize transition-colors ${focus && "text-primary"}`}>{placeholder}</span>
        <input id={placeholder + "_"} className="grow outline-none" type={type} />
    </label>
}
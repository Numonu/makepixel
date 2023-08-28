type SoulTypes = {
    className?:string
}

export default function Soul({className}:SoulTypes){
    return <div className={`bg-neutral-200 animate-glare ${className}`}></div>
}
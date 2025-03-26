type Props = {
    value: string | number
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    name: string,
    type?: string,
  }
  export const Input = ({
    value,
    onChange,
    placeholder,
    name,
    type
  }: Props) => {
    return (
      <input
        className="bg-slate-200 h-8 rounded w-[250px] shadow px-2 bg-slate-300"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    )
  }
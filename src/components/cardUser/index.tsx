import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSelectedUserId, selectCurrentId } from "../../app/service/currentSlice";

type Props = {
  id: number;
  firstName: string;
  lastName: string;
};

export const CardUser = ({ firstName, lastName, id }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentId = useAppSelector(selectCurrentId);
  
  const isSelected = String(id) === currentId;

  const handleClick = () => {
    dispatch(setSelectedUserId(String(id)));
    navigate(`/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-[95%] cursor-pointer rounded p-2 text-center shadow transition-all duration-300 ${
        isSelected 
          ? 'bg-slate-500 text-white shadow-lg' 
          : 'bg-slate-300 hover:bg-slate-400'
      }`}
    >
      <UserOutlined 
        className={`absolute left-2 top-3 scale-125 ${
          isSelected ? 'text-white' : 'text-gray-700'
        }`} 
      />
      <h2 className="font-medium">
        {firstName} {lastName}
      </h2>
      {isSelected && (
        <span className="absolute right-2 top-2.5 text-sm">✓</span>
      )}
    </div>
  );
};
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../components/Input";
import { useEditUserMutation, useGetUserQuery } from "../app/service/api";
import { Loader } from "../static/loader";

export const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isError, isLoading } = useGetUserQuery(id!);
  const [error, setError] = useState<string | null>(null);
  const [editUser, { isLoading: isUpdating }] = useEditUserMutation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        age: data.age || 0,
        email: data.email || '',
      });
    }
  }, [data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (isNaN(Number(formData.age))) {
      setError("Возраст должен быть числом");
      return;
    }

    const requiredFields: (keyof typeof formData)[] = [
      "firstName",
      "lastName",
      "age",
      "email",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Поле "${field}" не может быть пустым`);
        return;
      }
    }

    try {
      await editUser({
        id: parseInt(id!),
        ...formData
      }).unwrap();
      setError(null);
    } catch (error) {
      setError("Ошибка при редактировании данных");
      console.error("Update error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className='bg-slate-100 w-full h-screen flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='bg-slate-100 w-full h-screen flex items-center justify-center'>
        <div className='shadow bg-slate-300 text-red-500 rounded p-2 text-xl'>
          Ошибка загрузки
        </div>
      </div>
    );
  }

  return (
    <div className='bg-slate-300 flex items-center justify-center h-full min-h-screen w-full'>
      <form onSubmit={handleSubmit} className='border gap-4 bg-slate-200 flex flex-col items-center justify-center p-3 rounded shadow'>
        <Input
          name="firstName"
          value={formData.firstName}
          placeholder="Имя"
          onChange={handleInputChange}
        />
        <Input
          name="lastName"
          value={formData.lastName}
          placeholder="Фамилия"
          onChange={handleInputChange}
        />
        <Input
          name="age"
          type="number"
          value={formData.age.toString()}
          placeholder="Возраст"
          onChange={handleInputChange}
        />
        <Input
          name="email"
          type="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleInputChange}
        />
        <button 
          type="submit" 
          disabled={isUpdating}
          className='border bg-slate-400 px-2 w-5/6 rounded hover:bg-slate-500 transition-colors'
        >
          {isUpdating ? 'Обновление...' : 'Изменить'}
        </button>
        {error && (
          <div className="h-8 px-2 flex items-center justify-center text-white bg-red-400 shadow rounded w-full">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};
import { useEffect, useRef, useState } from 'react'
import { useGetUsersQuery } from '../../app/service/api'
import { Loader } from '../../static/loader'
import { CardUser } from '../cardUser'
import type { UserData } from '../../types/user';
const LIMIT = 30;

export const SideBar = () => {
    const [start, setStart] = useState<number>(0);
    const { data, isError, isLoading, isFetching } = useGetUsersQuery({ start, limit: LIMIT });
    const observerRef = useRef<HTMLDivElement>(null);
    const [allUsers, setAllUsers] = useState<UserData[]>([]);
    useEffect(() => {
        if (data?.data) {
            setAllUsers(prev => [...prev, ...data.data]);
        }
    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching) {
                    setStart(prev => prev + LIMIT);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = observerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [isFetching]);

    if (isLoading && allUsers.length === 0) {
        return (
            <div className='bg-slate-200 w-1/5 h-screen flex items-center justify-center'>
                <Loader />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='bg-slate-200 w-1/5 h-screen flex items-center justify-center'>
                <div className='shadow bg-slate-300 text-red-300 rounded p-2 text-xl'>
                    Ошибка загрузки
                </div>
            </div>
        );
    }

    return (
        <div className='bg-slate-200 py-5 flex flex-col items-center gap-4 h-screen w-1/5 overflow-y-auto'>
            {allUsers.map(user => (
                <CardUser
                    key={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    id={user.id}
                />
            ))}
            {isFetching && <div className='scale-50'><Loader/></div>}
            <div 
                ref={observerRef} 
                className='h-1 w-full'
            />
        </div>
    );
};
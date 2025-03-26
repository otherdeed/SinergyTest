import { SideBar } from "../components/SideBar"

type Props ={
    children: React.ReactNode,
}
export const Layout = ({
    children
}: Props) => {
  return (
    <div className="flex min-h-screen">
        <SideBar/>
        {children}
    </div>
  )
}

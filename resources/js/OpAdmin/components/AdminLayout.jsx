import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

export default function AdminLayout() {
    <>
        <Header />
        <Sidebar />
        <Outlet />
    </>
}

import { UserSearch } from "lucide-react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiAdminLine } from "react-icons/ri";

export const roles = [
    {
        value: "TENANT",
        label: "Người thuê",
        icon: UserSearch,
    },
    {
        value: "LANDLORD",
        label: "Người cho thuê",
        icon: HiOutlineBuildingOffice2,
    },
    {
        value: "ADMIN",
        label: "Quản trị viên",
        icon: RiAdminLine,
    },
]


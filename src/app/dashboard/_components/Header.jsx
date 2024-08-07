"use client";
import { Button } from "@/src/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const Header = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    //fetch logout api
    try {
      const response = await toast.promise(axios.post("/api/users/logout"), {
        loading: "Loading...",
        success: (response) => {
          if (response && response.data.success) {
            router.push("/login");
            return "Logged out successfully";
          }
        },
        error: "An error occurred. Please try again.",
      });
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex py-2 px-8 justify-between items-center bg-secondary shadow-sm">
      <Image src={"/logo.svg"} width={180} height={100} alt="img" />
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${
            pathName == "/dashboard" && "text-blue-800 font-bold"
          }`}
        >
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li
          className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${
            pathName == "/dashboard/questions" && "text-blue-800 font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${
            pathName == "/dashboard/upgrade" && "text-blue-800 font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${
            pathName == "/dashboard/how" && "text-blue-800 font-bold"
          }`}
        >
          How it works
        </li>
      </ul>
      {/* <UserButton/> */}
      <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-400">
        Logout
      </Button>
    </div>
  );
};

export default Header;

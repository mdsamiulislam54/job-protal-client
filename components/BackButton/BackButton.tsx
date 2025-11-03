"use client"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";


const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="text-white cursor-pointer "
    >
      &#8592;
      Back
    </Button>
  );
};

export default BackButton;
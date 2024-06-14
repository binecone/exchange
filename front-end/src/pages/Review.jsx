import { CircleCheckBig } from "lucide-react";
import mediaImage from "../assets/media.png";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Review = () => {
  const media = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex justify-center items-center w-full gap-20 px-10 py-8 lg:px-44 lg:py-20 bg-gradient-to-b from-[#E9F9FF] to-white">
      <div className="hidden lg:flex lg:flex-col lg:gap-2 lg:mt-10">
        <h5 className="font-medium text-md">Your EXTF</h5>
        <h1 className="mt-3 text-xl font-bold lg:text-3xl">
          Let’s review your investment.
        </h1>
        <div className="mt-20 flex items-start gap-3 text-[#3056d3]">
          <CircleCheckBig />
          <div className="flex flex-col items-start gap-3 font-medium text-black">
            <h3 className="font-bold">Your Media</h3>
            <span>This is your investment</span>
          </div>
        </div>
        {/* <div className="grid grid-cols-4 gap-3 mt-3">
          {media.map((item, index) => (
            <img key={index} src={mediaImage} alt="media" />
          ))}
        </div> */}
      </div>
      <div className="flex flex-col gap-4 px-6 py-5 bg-white lg:px-12 lg:py-10 lg:gap-5">
        <h1 className="text-xl font-bold text-black lg:text-2xl">
          Review the investment
        </h1>
        {/* <p className="text-lg font-semibold text-black lg:text-xl">
          Sender info
        </p>
        <Label className="text-muted-foreground">example@yourmail.com</Label>
        <Label className="text-muted-foreground">mytest.eth</Label> */}
        <p className="text-lg font-semibold text-black lg:text-xl">
          Investment info
        </p>
        {/* <Label className="text-muted-foreground">Adam Gelius</Label>
        <Label className="text-muted-foreground">example@yourmail.com</Label>
        <Label className="text-muted-foreground">This is a short message</Label>
        <Label className="text-muted-foreground">mytest.eth</Label>
        <Label className="text-muted-foreground">24/12/2090</Label> */}
        <div className="flex items-center justify-between gap-8 mt-32 lg:mt-48">
          <Link to="/media">
            <Button
              variant="outline"
              className="py-4 px-7 text-primary hover:text-primary border-[#3056D3] border-2"
            >
              Edit
            </Button>
          </Link>
          <Button className="bg-[#3056d3] text-white py-4 px-7">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;

import { useContext, useState } from "react";
import { ethers } from "ethers";
import { GlobalContext } from "../contexts/Context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Create = () => {
  const [state, dispatch] = useContext(GlobalContext);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  // console.log(state);

  const handleShowPreview = () => {
    if (!title || !message || !dueDate) {
      alert("fill all details");
      return;
    }
    if (dueDate <= new Date()) {
      alert("Please select a future date");
      return;
    }
    setShowPreview(true);
  };

  console.log(state);
  const makeTimeCapsule = async () => {
    if (!message || !title || !dueDate) {
      alert("fill all details");
      return;
    }
    try {
      // let fileBlob = new Blob([file]);
      // let msgblob = new Blob([strEncodeUTF16(message).buffer]);
      // let titleblob = new Blob([strEncodeUTF16(title).buffer]);
      // let fileHash = (await state.ipfs.add(fileBlob, {})).path;
      // let msgHash = (await state.ipfs.add(msgblob, {})).path;
      // let titleHash = (await state.ipfs.add(titleblob, {})).path;
      (
        await state.contract.registerTimeCapsule(
          ethers.BigNumber.from(Math.floor(dueDate.getTime() / 1000)),
          message,
          title,
          // fileHash,
          [recipient]
        )
      )
        .wait()
        .then(async (receipt) => {
          console.log(receipt);
        });
      setFile(null);
      setMessage("");
      setTitle("");
      setDueDate(new Date());
      setRecipient("");
      setShowPreview(false);

      toast.success(
        "Time Capsule created successfully!!\nThis will be reflected in your capsules soon"
      );
    } catch (err) {
      if (
        err.message ===
        "MetaMask Tx Signature: User denied transaction signature."
      ) {
        window.alert("User denied transaction");
      } else {
        dispatch({ type: "SET_ERROR", payload: err });
      }
    }
  };

  // const strEncodeUTF16 = (str) => {
  //   var buf = new ArrayBuffer(str.length * 2);
  //   var bufView = new Uint16Array(buf);
  //   for (var i = 0, strLen = str.length; i < strLen; i++) {
  //     bufView[i] = str.charCodeAt(i);
  //   }
  //   return bufView;
  // };

  if (showPreview) {
    return (
      <div className="flex flex-col justify-center w-full px-10 py-8 gap-4 lg:px-44 lg:py-20 bg-[#E9F9FF]">
        <h5 className="font-medium text-md">ALMOST THERE</h5>
        <h1 className="text-xl font-bold lg:text-3xl">
          Let&apos;s review your investment.
        </h1>
        <div className="flex flex-col gap-5 md:flex-row md:gap-20">
          <div className="hidden lg:flex lg:flex-col lg:gap-2">
            <div className="mt-5 flex items-start gap-3 text-[#3056d3]">
              <CircleCheckBig />
              <div className="flex flex-col items-start gap-3 font-medium text-black">
                <h3 className="font-bold">Your Media</h3>
                <span>This is your investment</span>
              </div>
            </div>
            <div className="flex flex-col grid-cols-2 gap-6 md:grid">
              <div className="h-full">
                {file.type.includes("image/") ? (
                  <img src={URL.createObjectURL(file)} className="h-full" />
                ) : (
                  <video controls src={URL.createObjectURL(file)}></video>
                )}
              </div>
              <div className="flex flex-col self-end h-full gap-4 px-6 py-5 bg-white lg:px-12 lg:py-8 lg:gap-5">
                <h1 className="text-xl font-bold text-black lg:text-2xl">
                  Review the information
                </h1>
                <p className="text-lg font-semibold text-black lg:text-xl">
                  Receiver info
                </p>
                <Label className="text-muted-foreground">Title</Label>
                <p className="px-3 py-2 border rounded border-input bg-background">
                  {title}
                </p>
                <Label className="text-muted-foreground">Message</Label>
                <p className="px-3 py-2 border rounded border-input bg-background">
                  {message}
                </p>
                <Label className="text-muted-foreground">Wallet</Label>
                <p className="px-3 py-2 border rounded border-input bg-background">
                  {recipient}
                </p>
                <Label className="text-muted-foreground">Due Date</Label>
                <p className="px-3 py-2 border rounded border-input bg-background">
                  {format(dueDate, "PPP")}
                </p>
                <div className="flex items-center gap-8">
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(false)}
                    className="py-4 px-7 text-primary hover:text-primary border-[#3056D3] border-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={makeTimeCapsule}
                    className="bg-[#3056d3] text-white py-4 px-7"
                  >
                    Send capsule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      id="createcapsule"
      className="min-h-[90vh] flex flex-col md:grid grid-cols-2 items-center w-full justify-center gap-4 md:gap-6 md:px-44 py-20 bg-[#E9F9FF]"
    >
      <div className="flex flex-col justify-center gap-2 space-y-4 md:w-full">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-3xl text-primary">
        <u>How Exchange TF works</u>
        </h2>
        <h4 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-3xl">
        A. Staking
        </h4>
        <p className="text-xl ">1. KYC Verification</p>
        <p className="text-xl ">2. Staking coins</p>
        <p className="text-xl ">3. Exchange to total ETFs</p>

        <h4 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-3xl">
        B. Unstaking
        </h4>
        <p className="text-xl ">1. KYC Verification</p>
        <p className="text-xl ">2. Exchange to coins</p>
        <p className="text-xl ">3. Unstaking coins</p>

        <br />

        {/* <div className="flex items-center justify-center w-full">
          <label
            htmlFor="media"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              {file ? (
                file.name
              ) : (
                <>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    MP4, JPEG, JPG, GIF, WebM, Mov (MAX. 10MB)
                  </p>
                </>
              )}
            </div>
          </label>
          <input
            id="media"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div> */}
      </div>
      <div className="flex items-center justify-center w-full gap-10 px-10">
        <div className="flex flex-col text-[#637381] w-full bg-white px-6 lg:px-12 py-5 lg:py-10 gap-2">
          <h1 className="text-lg font-bold text-black text-center lg:text-2xl">
            <u>Exchange TF</u>
          </h1>
          <p className="text-xl font-semibold text-black">Your staking</p>
          <Label className="mt-3 text-sm">Name</Label>
          <Input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Your name here"
            required
          />
          <Label className="mt-3 text-sm">Amount of staking</Label>
          <Input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Input amount here"
            required
          />
          <Label className="mt-3 text-sm">Your wallet address</Label>
          <Input
            type="text"
            onChange={(e) => setRecipient(e.target.value)}
            value={recipient}
            placeholder="0xXXXXXXXX"
            required
          />
          <Label className="mt-3 text-sm">Unstaking Date</Label>{" "}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal w-full",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <CalendarDays className="w-4 h-4 mr-2" />
                {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {/* <Link to="/review"> */}
          <Button onClick={handleShowPreview} className="w-full mt-2">
            Stake now
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Create;

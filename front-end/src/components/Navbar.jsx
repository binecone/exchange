import { useState } from "react";
import Web3Connection from "./web3-connection.jsx";
import { Link } from "react-router-dom";


const Navbar = () => {
  let Links = [
    { name: "Create Capsule", link: "#createcapsule" },
    { name: "About", link: "#about" },
    { name: "FAQs", link: "#faqs" },
  ];
  let [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between w-full h-16 max-w-screen-2xl">
        <Link to="/" className="flex items-center mr-6 space-x-2 text-primary">
          {/* <Icons className="w-6 h-6" /> */}
          <span className="font-bold">Exchange TF</span>
        </Link>
        <Web3Connection />
      </div>
    </nav>
  );
};

export default Navbar;

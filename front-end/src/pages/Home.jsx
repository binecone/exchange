import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Review from "./Review";
import MyMedia from "./MyMedia";
import Create from "./Create";
import Features from "@/components/Features";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <Features />
      <Create />
      {/* <MyMedia /> */}
      {/* <Review /> */}
    </div>
  );
};

export default Home;

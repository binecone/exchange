import { useContext, useState, useEffect } from "react";
import { Rings } from "react-loader-spinner";
import { GlobalContext } from "../contexts/Context";
import Capsule from "@/components/Capsule";
// import OpenCapsule from "./OpenCapsule";

const Capsules = () => {
  const [state, dispatch] = useContext(GlobalContext);
  const [tokenlist, setTokenlist] = useState([]);
  const [connecting, setConnecting] = useState(false);
  //   const [open, setOpen] = useState();
  console.log(state);

  useEffect(() => {
    const getTimeCapsuleList = async () => {
      let address = await (await state.provider.getSigner()).getAddress();
      setConnecting(true);
      const newtokenlist = [];
      var loop = true;
      for (var i = 0; loop; i++) {
        try {
          let tokenId = (
            await state.contract.tokenOfOwnerByIndex(address, i)
          ).toNumber();
          let dueDate = new Date(
            (await state.contract.dueDate(tokenId)).toNumber() * 1000
          );
          let creationDate = new Date(
            (await state.contract.creationDate(tokenId)).toNumber() * 1000
          );

          let title = await state.contract.viewTitle(tokenId);
          //   let data = await fetch(`https://ipfs.io/ipfs/${uri}`);
          //   let blob = await data.blob();
          //   let arrayBuffer = await blob.arrayBuffer();
          //   let title = String.fromCharCode.apply(
          //     null,
          //     new Uint16Array(arrayBuffer)
          //   );

          newtokenlist.push({
            id: tokenId,
            dueDate: dueDate,
            creationDate: creationDate,
            title: title,
          });
        } catch (err) {
          loop = false;
        }
      }
      setTokenlist(newtokenlist);
      setConnecting(false);
      console.log(newtokenlist);
    };

    getTimeCapsuleList();
  }, [state]);

  if (connecting) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Rings
          height="80"
          width="80"
          color="#2563EB"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
  }
  if (tokenlist.length <= 0) {
    return (
      <div className="flex h-[80vh] w-screen items-center justify-center">
        No time capsules to display
      </div>
    );
  }
  return (
    <div>
      {
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10 min-h-[80vh] py-10 px-10">
          {tokenlist
            ?.slice()
            .reverse()
            .map((item, index) => (
              <Capsule key={index} item={item} />
            ))}
        </div>
      }
    </div>
  );
};

export default Capsules;

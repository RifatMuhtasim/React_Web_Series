import React, { useState, useEffect} from "react";


export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const useWindowResize = () => {
  const [size, setSize ] = useState([window.innerHeight, window.innerWidth])

  useEffect(() => {
    const handle_resize = () => {
      setSize([window.innerHeight, window.innerWidth])
    }
    window.addEventListener("resize", handle_resize);

    return() => {
      window.removeEventListener("resize", handle_resize)
    }
  }, [])

  return size;
}

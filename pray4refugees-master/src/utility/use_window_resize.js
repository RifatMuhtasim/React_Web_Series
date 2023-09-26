import React, { useEffect, useState} from 'react';


export const Use_window_resize = () => {
  const [ size, setSize] = useState([ window.innerHeight, window.innerWidth ])
  useEffect(() => {
    const handle_resize = () => {
      setSize([ window.innerHeight, window.innerWidth ])
    }

    window.addEventListener("resize", handle_resize)
    return () => {
      window.removeEventListener("resize", handle_resize)
    }
  }, [])
  return size;
}
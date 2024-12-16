import { useEffect, useRef } from "react";

export const useHorizontalScroll = () => {
  const scrollRef = useRef();

  const onWheel = (e: any) => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    scrollRef?.current?.scrollTo({
      left: scrollRef.current.scrollLeft + e.deltaY,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Store the ref value to unsubscribe from event during componentWillUnmount
    let refValueHolder: any | null = null;
    if (scrollRef) {
      refValueHolder = scrollRef.current;
      refValueHolder.addEventListener("wheel", onWheel);
    }
    return () => {
      refValueHolder.removeEventListener("wheel", onWheel);
    };
  }, []);

  return scrollRef;
};

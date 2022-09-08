import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import useAuth from "../hooks/useAuth";

const Sidebar = () => {

  const apps = [];
  const styles = [];

  const { user } = useAuth();
  const router = useRouter();

  const seeMoreAppsButtonRef = useRef(null);
  const [seeMoreApps, setSeeMoreApps] = useState(false);
  const [renderedApps, setRenderedApps] = useState(
    apps.slice(0, 4)
  );

  const sidebarRef = useRef(null);
  const scrollbarPlaceholderRef = useRef(null);
  const [sidebarIsExtended, setSidebarIsExtended] = useState(false);

  const [firstUpdate, setFirstUpdate] = useState(true);

  useLayoutEffect(() => {
    if (firstUpdate) {
      setFirstUpdate(false);
      setSidebarIsExtended(window.innerWidth <= 768);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setSidebarIsExtended(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    let timer;

    const handler = () => {
      sidebarRef.current.classList.remove("remove-scrollbar");
      scrollbarPlaceholderRef.current.classList.add("hidden");
      timer = setTimeout(function () {
        sidebarRef.current.classList.add("remove-scrollbar");
        scrollbarPlaceholderRef.current.classList.remove("hidden");
      }, 2500);
    };

    sidebarRef.current.addEventListener("scroll", handler);

    return () => {
      clearTimeout(timer);
      sidebarRef.current?.removeEventListener("scroll", handler);
    };
  });

  useEffect(() => {
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
      e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }

    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function () {
            supportsPassive = true;
          },
        })
      );
    } catch (e) {}

    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent =
      "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    function disableScroll() {
      window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
      window.addEventListener("keydown", preventDefaultForScrollKeys, false);
    }

    function enableScroll() {
      window.removeEventListener("DOMMouseScroll", preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener("touchmove", preventDefault, wheelOpt);
      window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
    }

    function handleResize() {
      if (window.innerWidth <= 768) {
        sidebarRef.current.addEventListener("mouseenter", disableScroll);
        sidebarRef.current.addEventListener("mouseleave", enableScroll);
      } else {
        sidebarRef.current.removeEventListener("mouseenter", disableScroll);
        sidebarRef.current.removeEventListener("mouseleave", enableScroll);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      sidebarRef.current?.removeEventListener("mouseenter", disableScroll);
      sidebarRef.current?.removeEventListener("mouseleave", enableScroll);
    };
  });

  return (
    <div
      ref={sidebarRef}
      className="flex h-[90vh] min-w-[56px] sm:w-1/4 xl:w-1/3 border-r-2 border-black overflow-y-scroll overscroll-contain style-scrollbar justify-items-center remove-scrollbar"
    >
      <div className="flex flex-col items-center justify-between w-full min-h-full pt-8 ">


        <div className="flex flex-col items-center justify-center py-2 border-b-2 border-black">
          {renderedApps.map((app) => {
            return (
              <Link href={`/${app?.name}}`} key={app?.name}>
                <div className="flex items-center justify-center my-2 rounded cursor-pointer hover:brightness-125 md:hover:bg-green-600 md:w-full md:h-12 md:mx-2">
                  <Image
                    src={app?.logo?.url}
                    alt={`${app?.name} Logo`}
                    width={24}
                    height={24}
                    layout="fixed"
                    className="w-6 h-6 rounded-full xl:w-12 xl:h-12 md:ml-4"
                  />

                  <div className="flex-col hidden ml-4 md:flex">
                    <span>{app?.name}</span>
                  </div>
                </div>
              </Link>
            );
          })}
          <button
            ref={seeMoreAppsButtonRef}
            className="hidden text-xs md:flex md:px-12"
            onClick={() => {
              setRenderedApps(
                !seeMoreApps ? apps : apps.slice(0, 4)
              );
              setSeeMoreApps(!seeMoreApps);
              seeMoreAppsButtonRef.current.innerHTML = seeMoreApps
                ? "See More"
                : "See Less";
            }}
          >
            See More
          </button>
        </div>

       
        <div className="flex flex-col items-center justify-center py-2">
          <div className="flex-wrap items-center justify-center hidden mb-24 text-sm md:flex md:w-2/3">
            <Link href="/about">
              <a className="px-4 py-2 my-2 rounded hover:bg-green-600 ">
                About
              </a>
            </Link>

            <Link href="/terms">
              <a className="px-4 py-2 my-2 rounded hover:bg-green-600 ">
                Terms
              </a>
            </Link>

            <Link href="/contact">
              <a className="px-4 py-2 my-2 rounded hover:bg-green-600 ">
                Contact
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div ref={scrollbarPlaceholderRef} className="w-[12px] h-full"/>
    </div>
  );
};

export default Sidebar;
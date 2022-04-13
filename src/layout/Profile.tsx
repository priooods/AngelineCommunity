import React, { useEffect, useState } from "react";
import { User } from "../interface/User";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { GetProfile } from "../service/profile.service";
import { PrimaryButton } from "@fluentui/react/lib/Button";

export default function Profile() {
  const [profile, setProfile] = useState<User>();
  const [tabs, setTabs] = useState(1);
  const navigate = useNavigate();
  const locations = useLocation();

  function setupTabs(key: string) {
    switch (key) {
      case "":
        setTabs(1);
        break;
      case "about":
        setTabs(2);
        break;
      case "collection":
        setTabs(3);
        break;
    }
  }

  useEffect(() => {
    GetProfile(setProfile);
  }, []);

  useEffect(() => {
    setupTabs(locations.pathname.replace("/profile/", ""));
  }, [locations.pathname]);

  const itemTab = [
    { id: 1, route: "", title: "Posting" },
    { id: 2, route: "about", title: "About" },
    { id: 3, route: "collection", title: "Collection" },
  ];

  return (
    <div className="sm:flex h-auto sm:py-5">
      <main className="h-auto w-8/12 sm:mr-auto">
        <div className="h-auto w-full rounded-md shadow-md bg-white mb-5 sm:pb-5">
          <div className="w-full h-32 bg-slate-400 rounded-t-md" />
          <div className="sm:px-7 sm:-mt-12">
            <div className="h-24 w-24">
              <img src="" alt="" className="h-full w-full bg-blue-500" />
            </div>
            <div className="mb-auto sm:mt-6 block">
              <p className="text-xl font-RobMed">{profile?.username}</p>
              <p className="text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </p>
              <div className="flex sm:mt-2.5 text-xs text-slate-600">
                <p>{profile?.userabout?.status}</p>
                <div className="mx-3">&bull;</div>
                <p>
                  {profile?.userabout?.location
                    ? profile?.userabout?.location
                    : "Indonesia"}
                </p>
                <div className="mx-3">&bull;</div>
                <p>
                  100 <span>Mengikuti</span>
                </p>
              </div>
              <p className="font-RobSemBold text-xs text-blue-600 inline-block cursor-pointer mt-4">
                Lihat 300k pengguna lain di Angeline
              </p>
            </div>
            <div className="sm:mt-5 flex justify-start">
              <PrimaryButton
                iconProps={{
                  iconName: "Edit",
                }}
                className="bg-blue-700 my-auto"
              >
                Ubah
              </PrimaryButton>
              <PrimaryButton
                iconProps={{
                  iconName: "Share",
                }}
                className="border border-slate-600 text-slate-900 my-auto ml-4"
              >
                Bagikan
              </PrimaryButton>
            </div>
          </div>
          {/* <div className="w-full sm:grid grid-rows-1 font-RobReg text-sm grid-flow-col-dense">
            {itemTab.map((item, i) => {
              return (
                <div
                  key={i}
                  className="block text-center cursor-pointer hover:bg-slate-100"
                  onClick={() => {
                    setTabs(item.id);
                    navigate(item.route);
                  }}
                >
                  <p
                    className={`${"sm:py-3 sm:px-3"} ${
                      tabs === item.id ? "text-blue-600" : "text-slate-500"
                    }`}
                  >
                    {item.title}
                  </p>
                  <div
                    className={`${
                      tabs === item.id ? "bg-blue-500" : ""
                    } ${"h-1 w-full"}`}
                  ></div>
                </div>
              );
            })}
          </div> */}
        </div>
        <div className="sm:mt-4 rounded-md shadow-md bg-white sm:px-7">
          <div className="grid grid-cols-4 grid-rows-1">
            {itemTab.map(function (item, i) {
              return (
                <div
                  key={item.id}
                  className="block text-sm font-RobReg cursor-pointer hover:bg-slate-100"
                  onClick={() => {
                    navigate(item.route);
                    setTabs(item.id);
                  }}
                >
                  <div className="sm:pb-2 sm:pt-3 sm:px-3 text-center">
                    <p
                      className={
                        item.id === tabs ? "text-orange-700" : "text-slate-700"
                      }
                    >
                      {item.title}
                    </p>
                  </div>
                  <div
                    className={`${
                      item.id === tabs ? "bg-orange-500" : "bg-white h-0"
                    }  ${"h-0.5 w-auto"}`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        <Outlet context={{ profile }} />
      </main>
      <div className=" sticky top-8 w-4/12 ml-6 bg-blue-500 h-32"></div>
    </div>
  );
}

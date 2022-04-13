import React, { useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../service/auth.service";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import toast from "react-hot-toast";

function PressButton(event: any, password: any, email: any, navigasi: any) {
  if (event.keyCode === 13) {
    UserLogin(
      {
        password: password,
        email: email,
      },
      navigasi
    );
  }
}

export default function Login() {
  const navigasi = useNavigate();
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  return (
    <div className="z-0">
      <div className="md:flex w-full md:h-screen h-auto md:justify-center">
        {/* hidden when not mobile device */}
        <div className="md:w-3/6 w-full hidden md:h-screen sm:flex bg-gradient-to-br from-blue-500 to-blue-700">
          <div className="md:mt-auto md:mx-0 mx-auto md:mb-20 md:ml-14 text-gray-100">
            <p className=" font-RobBold md:text-2xl">Angeline Community</p>
            <p className="md:block hidden mt-2 font-RobReg">
              Belajar teknologi bareng teman-teman indonesia
            </p>
          </div>
        </div>
        {/* show when mobile device */}
        <div className="bg-gradient-to-r sm:hidden block from-blue-500 to-blue-700 text-center py-1.5">
          <p className="text-xs font-RobSemBold text-slate-200">
            Angeline Community
          </p>
        </div>
        <div className="md:w-3/6 w-full md:h-max-screen h-auto dark:bg-slate-900">
          <div className="md:flex justify-center md:h-screen md:px-0 px-5">
            <div className="md:my-auto md:mx-auto md:w-4/6">
              <div className=" md:mt-0 mt-10">
                {/* hidden when not mobile device */}
                <p className="font-RobSemBold text-lg">
                  Login dengan account kamu
                </p>
                <p className="md:mt-3 mt-3 font-RobReg text-slate-600 text-xs">
                  Terimakasih sudah datang kembali, Angeline hari ini punya
                  banyak ilmu baru untuk kamu
                </p>
              </div>
              <div className="md:mt-10 mt-6">
                <TextField
                  label="Email"
                  placeholder="Email"
                  type="email"
                  onChange={(event, value) => {
                    setEmail(value ? value : "");
                  }}
                  value={email}
                />
                <TextField
                  label="Password"
                  placeholder="Password"
                  className="md:mt-3 mt-2"
                  type="password"
                  onKeyUp={(event) =>
                    PressButton(event, password, email, navigasi)
                  }
                  onChange={(event, value) => {
                    setPassword(value ? value : "");
                  }}
                  value={password}
                />
                <p className="text-right mt-3 text-xs font-RobMed">
                  <span className="inline-flex cursor-pointer text-blue-400 hover:text-blue-600">
                    Lupa password ?
                  </span>
                </p>
                <PrimaryButton
                  className="md:mt-10 mt-5 text-center py-1.5 bg-blue-600 w-full font-RobReg text-sm text-white
                    rounded-md cursor-pointer transition ease-in-out delay-150 hover:bg-blue-800 duration-250"
                  text="Masuk"
                  allowDisabledFocus={true}
                  menuTriggerKeyCode={13}
                  onClick={(e: any) => {
                    if (password && email) {
                      UserLogin(
                        {
                          password: password,
                          email: email,
                        },
                        navigasi
                      );
                    } else toast.error("Masukan informasi account anda");
                  }}
                ></PrimaryButton>
                <p className="md:mt-5 mt-4 text-xs font-RobReg text-slate-600 text-center">
                  Kamu belum punya account ?
                  <Link to="/register">
                    <span className=" font-RobMed text-blue-400 hover:text-blue-600 ml-1.5 hover:cursor-pointer">
                      Join Angeline Community
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

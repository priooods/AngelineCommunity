import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@fluentui/react/lib/TextField";
import { Checkbox } from "@fluentui/react";
import toast from "react-hot-toast";
import Validation from "../../helper/Validator";
import { UserRegister } from "../../service/auth.service";
import { PrimaryButton } from "@fluentui/react/lib/Button";

function _text_checkbox() {
  return (
    <span className=" text-xs font-popmed">
      Ya, saya akan mematuhi semua aturan Angeline
    </span>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(String);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [confirm_password, setConfirmPassword] = useState(String);
  const [check_status, setCheckStatus] = useState(Boolean);
  return (
    <div>
      <div className="md:flex w-full md:h-screen h-auto md:justify-center sm:pb-10 pb-10">
        {/* hidden when not mobile device */}
        <div className="md:w-2/6 w-full hidden md:h-screen sm:flex bg-gradient-to-br from-blue-500 to-blue-700">
          <div className="md:mx-0 mx-auto md:mt-20 md:px-12 text-gray-100">
            <p className="md:block hidden mt-2 font-RobSemBold text-3xl">
              Ciptakan teknologi masa depan kamu sendiri
            </p>
          </div>
        </div>
        {/* show when mobile device */}
        <div className="bg-gradient-to-r sm:hidden block from-blue-500 to-blue-700 text-center py-1.5">
          <p className="text-xs font-RobMed text-slate-200">
            Angeline Community
          </p>
        </div>
        <div className="md:w-4/6 w-full md:h-max-screen h-auto dark:bg-slate-900">
          <div className="md:flex md:h-screen md:px-0 px-5">
            <div className="md:my-auto md:ml-20 md:w-4/6">
              <div className=" md:mt-0 mt-10">
                {/* hidden when not mobile device */}
                <p className="font-RobMed text-lg">Bergabung dengan Angeline</p>
                <p className="md:mt-3 mt-3 font-RobReg text-slate-600 text-xs">
                  Kamu akan mengambil langkah pertama untuk menciptakan{" "}
                  <br className="md:block hidden" />
                  teknologi baru di masa depan
                </p>
              </div>
              <div className="md:mt-10 mt-6">
                <div className="grid md:grid-cols-2 md:gap-3">
                  <TextField
                    label="Email"
                    placeholder="Email"
                    onChange={(event, value) => {
                      setEmail(value ? value : "");
                    }}
                    value={email}
                  />
                  <TextField
                    label="Username"
                    placeholder="Username"
                    value={username}
                    onChange={(event, value) => {
                      setUsername(value ? value : "");
                    }}
                  />
                  <TextField
                    label="Password"
                    placeholder="Password"
                    type="password"
                    onChange={(event, value) => {
                      setPassword(value ? value : "");
                    }}
                    value={password}
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    onGetErrorMessage={(value: string) => {
                      if (value !== password) {
                        setConfirmPassword(value ? value : "");
                        return "Confirm Password tidak valid";
                      }
                    }}
                    onChange={(event, value) => {
                      setConfirmPassword(value ? value : "");
                    }}
                  />
                </div>
                <div className="md:mt-8 mt-4">
                  <Checkbox
                    onRenderLabel={_text_checkbox}
                    className="text-xs font-RobReg"
                    onChange={(event, checked) => {
                      setCheckStatus(checked ? checked : false);
                    }}
                  />
                </div>
                <PrimaryButton
                  menuTriggerKeyCode={13}
                  className={`${
                    check_status &&
                    confirm_password &&
                    password &&
                    username &&
                    email
                      ? "bg-blue-600 hover:bg-blue-800 "
                      : "opacity-50 cursor-not-allowed bg-blue-600"
                  } ${"md:mt-6 mt-4 w-full text-center py-1.5 rounded-md cursor-pointer transition ease-in-out delay-150 duration-250"}`}
                  onClick={() => {
                    if (
                      check_status &&
                      confirm_password &&
                      password &&
                      username &&
                      email
                    ) {
                      const validate = Validation([
                        {
                          email: email,
                          password: password,
                          username: username,
                        },
                      ]);
                      if (validate === true) {
                        UserRegister(
                          {
                            username: username,
                            email: email,
                            password: password,
                          },
                          navigate
                        );
                      } else {
                        return validate.forEach((element: any) => {
                          toast.error(element);
                        });
                      }
                    } else {
                      return false;
                    }
                  }}
                >
                  <span className="font-RobReg text-sm text-white">Daftar</span>
                </PrimaryButton>
                <p className="md:mt-5 mt-4 text-xs font-RobReg text-slate-600 text-center">
                  Sudah punya account ?
                  <Link to="/login">
                    <span className=" font-RobMed text-blue-400 hover:text-blue-600 ml-1.5 hover:cursor-pointer">
                      Masuk
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

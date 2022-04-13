import React from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { IIconProps } from "@fluentui/react";
import { Icon } from "@fluentui/react/lib/Icon";
import { useOutletContext } from "react-router-dom";
import { User } from "../../interface/User";
import { Modal } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

export default function ProfileAbout() {
  const { profile } = useOutletContext<{ profile: User }>();
  const [whenModalOpen, { setTrue: openModal, setFalse: closeModal }] =
    useBoolean(false);
  const icons: IIconProps = { iconName: "EditContact" };
  return (
    <div>
      <div className="w-full h-auto sm:p-7">
        <div className="flex justify-end">
          <PrimaryButton
            iconProps={icons}
            onClick={openModal}
            className="bg-blue-600 rounded-lg text-xs"
          >
            Edit
          </PrimaryButton>
        </div>
        <p className=" font-popsembold text-sm">Tentang</p>
        <div className="sm:pb-5 sm:mt-7 border-b text-xs">
          <p>
            {profile?.userabout?.bio
              ? profile?.userabout?.bio
              : "Bio anda kosong"}
          </p>
        </div>
        <div className="sm:mt-5">
          <div className="grid grid-cols-2 sm:grid-rows-3 gap-5">
            <div className="inline-flex w-full text-sm">
              <Icon iconName="MapDirections" className="my-auto" />
              <p className="sm:ml-3 my-auto">{profile?.userabout?.location}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal onDismiss={closeModal} isOpen={whenModalOpen}>
        <div>
          <p>Edit Informasi</p>
        </div>
      </Modal>
    </div>
  );
}

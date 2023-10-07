"use client";

import axios from "axios";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useUserProvider } from "@/contexts/userprovider";
import { useToastProvider } from "@/contexts/toastprovider";
import { useRouter } from "next/navigation";

const Settings = () => {
  const { user, setUser } = useUserProvider();
  const { setToast } = useToastProvider();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteInput, setDeleteInput] = useState("");
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

  const Logout = () => {
    localStorage.removeItem("token");
    setUser(null!);
    router.push("/login");
  };

  const DeleteAccount = async () => {
    setSpinner(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${process.env.BACKEND_URL}/users/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setToast({
          title: "Account Deletion",
          message: "Account Deletion successful!",
          variant: "solid",
          action: undefined,
          type: "success",
        });
        Logout();
        setSpinner(false);
      }
    } catch (error: any) {
      console.log(error);
      setToast({
        title: "Login Authentication",
        message: error.response.data.message || "Something went wrong!",
        variant: "solid",
        action: undefined,
        type: "error",
      });
      setSpinner(false);
    }
  };
  return (
    <div>
      <Button onPress={onOpen}>Delete Account</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure to delete account?
              </ModalHeader>
              <ModalBody>
                <p>
                  Write down{" "}
                  <span className="px-2 bg-pink-100 text-pink-600 font-semibold pb-[2px] rounded-md">
                    delete account
                  </span>{" "}
                  below
                </p>
                <Input onChange={(e) => setDeleteInput(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isLoading={spinner}
                  onPress={() =>
                    deleteInput && user && localStorage && DeleteAccount()
                  }
                >
                  {spinner ? "Deleting" : "Delete Account"}
                </Button>
                <Button
                  color="success"
                  className="text-white"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Settings;

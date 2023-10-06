"use client";

import ErrorBar from "@/components/ErrorBar";
import { EyeFilledIcon } from "@/components/icons/eyefilledicon";
import { EyeSlashFilledIcon } from "@/components/icons/eyeslashfilledicon";
import { title } from "@/components/primitives";
import { useToastProvider } from "@/contexts/toastprovider";
import { ChangeEvent, FormEvent, RegisterForm } from "@/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  // hooks
  const { setToast } = useToastProvider();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);
  const [formInputs, setFormInputs] = useState<RegisterForm>({
    email: "",
    password: "",
    name: ""
  });
  const [formErrors, setFormErrors] = useState(formInputs);

  // handler functions
  const LoginAPIFetcher = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/auth/register`,
        formInputs
      );
      if (response.status === 200) {
        console.log({ response });
        setLoading(false);
        setToast({
          title: "Register Authentication",
          message: "Register successful!",
          variant: "solid",
          action: undefined,
          type: "success",
        });
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setToast({
        title: "Register Authentication",
        message: error.response.data.message || "Something went wrong!",
        variant: "solid",
        action: undefined,
        type: "error",
      });
    }
  };

  const OnChangeHandler = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const OnSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = ValidateInputs();
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      LoginAPIFetcher();
    }
  };

  const ValidateInputs = () => {
    let errors: any = {};

    if (!formInputs.email.trim()) {
      errors.email = "Email is required!";
    }
    if (!formInputs.password.trim()) {
      errors.password = "Password is required!";
    }
    if (!formInputs.name.trim()) {
        errors.name = "Name is required!";
      }

    return errors;
  };

  return (
    <div>
      <h1 className={title()}>Register</h1>
      <form
        onSubmit={OnSubmitHandler}
        className="min-w-[300px] mt-10 grid grid-cols-1 gap-5"
      >
        <div>
          <Input
            type="text"
            label="Name"
            name="name"
            onChange={OnChangeHandler}
          />
          <ErrorBar error={formErrors?.name} />
        </div>
        <div>
          <Input
            type="email"
            label="Email"
            name="email"
            onChange={OnChangeHandler}
          />
          <ErrorBar error={formErrors?.email} />
        </div>
        <div>
          <Input
            type={isVisible ? "text" : "password"}
            label="Password"
            name="password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            onChange={OnChangeHandler}
          />
          <ErrorBar error={formErrors?.password} />
        </div>
        <Button color="primary" type="submit" isLoading={loading}>
          {loading ? "Registering" : "Register"}
        </Button>
      </form>
      <Link href="/login" className="mt-10">
        Already have account? Login now!
      </Link>
    </div>
  );
}

import {ReactElement, SVGProps} from "react";
import React from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UserType = {
  _id: any;
  name: String;
  email: String;
  role: String;
};

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export type Toast = {
  title: String;
  message: String;
  variant: "shadow" | "border" | "solid";
  action?: ReactElement | undefined;
  type: "success" | "error" | "warning" | "normal";
};

// form types
export type LoginForm = {email: String, password: String};
export type RegisterForm = {email: String, password: String, name: String};

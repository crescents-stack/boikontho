"use client";

import { useUserProvider } from "@/contexts/userprovider";

const Profile = () => {
  const { user } = useUserProvider();
  console.log(user);
  return (
    <div>
      <p className="font-semibold">Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
};

export default Profile;

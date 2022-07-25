import React from "react";
import { NextPage, NextPageContext } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { IUser } from "@/models/IUser";

import { User } from "@/components/screens/user/User";

export const getServerSideProps = async (context: NextPageContext) => {
  const res = await fetch(`${process.env.API_URL}/profile/${context.query.id}`);
  const profile = await res.json();
  return {
    props: { profile },
  };
};

const UserPage: NextPage<{ profile: IUser & { statusCode: number } }> = ({ profile }) => {
  const router = useRouter();
  if (profile.statusCode) {
    router.replace("/");
    toast.warning("Пользователь не найден", { toastId: "user_error" });
    return null;
  }
  return <User profile={profile} />;
};
export default UserPage;

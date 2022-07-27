import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Modal } from "@/components/layouts/modalLayout";
import Link from "next/link";

const AuthType: NextPage = () => {
  const {
    query: { message },
  } = useRouter();

  return (
    <Modal title={message as string} hideClose>
      <div>
        <h3 className="text-white-100 text-4xl font-bold">{message}</h3>
        <div className="text-center mt-5">
          <Link href="/">
            <a className="text-secondary-400 hover:underline">Перейти на главную</a>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default AuthType;

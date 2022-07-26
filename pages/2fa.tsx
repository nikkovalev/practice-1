import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { useActions } from "@/hooks/useActions";

import { useLogin2faMutation } from "@/store/auth/authApi";

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui";
import { Modal, styles as modalStyles } from "@/components/modal/Modal";

export const CodeEntryPage = () => {
  const { register, handleSubmit } = useForm();
  const [login2fa, { data, isLoading }] = useLogin2faMutation();
  const { saveToken } = useActions();
  const router = useRouter();

  const handleSend = (data: { [key: string]: any }) => login2fa(data.code);

  useEffect(() => {
    if (data) {
      saveToken(data.token);
      toast.success("Успешная авторизация");
      router.push("/");
    }
  }, [data]);

  return (
    <Modal title="Подтверждение аккаунта" hideClose>
      <div>
        <div className={modalStyles.modalTop}>
          <h1 className="text-white text-center">Подтверждение аккаунта</h1>
        </div>
        <form className="flex items-center justify-between" onSubmit={handleSubmit(handleSend)}>
          <Input {...register("code")} placeholder="Код" />
          <Button
            className="ml-3 sm:ml-0 sm:mt-[20px]"
            color="secondary"
            size="large"
            isDisabled={isLoading}
          >
            Отправить
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CodeEntryPage;

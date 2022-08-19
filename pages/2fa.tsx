import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { useActions } from "@/hooks/useActions";

import { useLogin2faMutation } from "@/store/auth/authApi";

import { Button, Text, Input } from "@/components/ui";
import { Modal, styles as modalStyles } from "@/components/layouts/modalLayout";

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
    <Modal title="Подтверждение аккаунта" hideClose={true}>
      <div className={modalStyles.top}>
        <Text as="h1" size="xxl" align="center" weight={700}>
          Подтверждение аккаунта
        </Text>
      </div>
      <form className="md:w-full" onSubmit={handleSubmit(handleSend)}>
        <Input {...register("code")} className="mb-[20px] md:w-full" placeholder="Код" />
        <Button className="mx-auto" color="secondary" size="large" isDisabled={isLoading}>
          Отправить
        </Button>
      </form>
    </Modal>
  );
};

export default CodeEntryPage;

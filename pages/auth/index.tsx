import React, { useEffect } from "react";
import cn from "classnames";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { toast } from "react-toastify";

import { IAuthLogin } from "@/models/IAuth";

import { useLoginUserMutation, useLoginVKMutation } from "@/store/auth/authApi";
import { useActions } from "@/hooks/useActions";

import { Modal, styles as modalStyles } from "@/components/layouts/modalLayout";
import { Button, Text } from "@/components/ui";
import { Input } from "@/components/ui/Input/Input";

import vkIcon from "@/assets/images/socials/vk.svg";

const AuthPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginUser, { data, isLoading }] = useLoginUserMutation();
  const [loginVK, { isLoading: isLoadingVK }] = useLoginVKMutation();
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { modalPrevUrl } = useAppSelector((state) => state.global);
  const { saveToken } = useActions();

  const handleClose = () => router.push(modalPrevUrl);
  const handleLogin = (data: { [key: string]: any }) => loginUser(data as IAuthLogin);
  const handleLoginVK = () => loginVK();

  useEffect(() => {
    if (!isLoading && data) {
      if (data.tfa) {
        router.push("/2fa");
        return;
      }
      toast.success("Успешная авторизация");
      saveToken(data.token);
      handleClose();
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (isAuth) {
      toast.warning("Вы уже авторизованы", { toastId: "auth_warning" });
      handleClose();
    }
  }, []);

  return (
    <Modal title="Войти" handleClose={handleClose}>
      <form className="flex flex-col items-center" onSubmit={handleSubmit(handleLogin)}>
        <div className={cn(modalStyles.top, modalStyles.top_flex)}>
          <Text
            className="mr-[50px] sm:mr-[25px] xs:mr-0 xs:mb-[10px]"
            as="h1"
            size="xxl"
            weight={700}
          >
            Войти
          </Text>
          <Text as="a" href="/register" color="primary" size="xl" weight={700}>
            Зарегистрироваться
          </Text>
        </div>
        <Input
          {...register("login", { required: true })}
          className="mb-5"
          placeholder="Имя или почта"
          isError={!!errors.login}
        />
        <Input
          {...register("password", { required: true })}
          placeholder="Пароль"
          type="password"
          isError={!!errors.password}
        />
        <Button
          className={modalStyles.authButton}
          color="secondary"
          size="large"
          isDisabled={isLoading || isLoadingVK}
        >
          Войти
        </Button>
        <Button
          className={modalStyles.authVK}
          color="blue"
          size="large"
          isDisabled={isLoading || isLoadingVK}
          onClick={handleLoginVK}
        >
          <Image src={vkIcon.src} width={25} height={25} alt="VK" />
          Войти через вк
        </Button>
      </form>
    </Modal>
  );
};

export default AuthPage;

import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { toast } from "react-toastify";

import { IAuthLogin } from "@/models/IAuth";

import { useLoginUserMutation } from "@/store/auth/authApi";
import { useActions } from "@/hooks/useActions";

import { Modal, styles as modalStyles } from "@/components/modal/Modal";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui/Input/Input";

const AuthPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginUser, { data, isLoading }] = useLoginUserMutation();
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { modalPrevUrl } = useAppSelector((state) => state.global);
  const { saveToken } = useActions();

  const handleClose = () => router.push(modalPrevUrl);
  const handleLogin = (data: { [key: string]: any }) => loginUser(data as IAuthLogin);

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
      <div className="flex flex-col items-center w-full">
        <div className={modalStyles.modalTop}>
          <h1 className="mr-[50px] sm:mr-[25px]">Войти</h1>
          <Link href="/register">
            <a>
              <h3 className="text-primary-400 font-bold">Зарегистрироваться</h3>
            </a>
          </Link>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
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
            isDisabled={isLoading}
          >
            Войти
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AuthPage;

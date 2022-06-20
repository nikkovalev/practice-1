import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { IAuthLogin } from "@/models/IAuth";
import { loginUser } from "@/store/reducers/auth/authActionCreators";
import { showAlert } from "@/store/reducers/alert/alertSlice";

import { Modal } from "@/components/modal/Modal";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui/Input/Input";

import modalStyles from "@/components/modal/Modal.module.scss";

const AuthPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuth, isLoading } = useAppSelector((state) => state.authReducer);
  const { modalPrevUrl } = useAppSelector((state) => state.globalReducer);

  const handleClose = () => router.push(modalPrevUrl);
  const login = (data: { [key: string]: any }) => {
    dispatch(loginUser(data as IAuthLogin));
  };

  useEffect(() => {
    if (isAuth) handleClose();
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      dispatch(showAlert({ text: "Вы уже авторизованы", type: "warning" }));
      handleClose();
    }
  }, []);

  return (
    <Modal title="Войти" handleClose={handleClose}>
      <div className="flex flex-col items-center">
        <div className={modalStyles.modalTop}>
          <h3 className={modalStyles.mr50}>Войти</h3>
          <Link href="/register">
            <a>
              <h4 className="text-primary-400 font-bold">Зарегистрироваться</h4>
            </a>
          </Link>
        </div>
        <form onSubmit={handleSubmit(login)}>
          <div className="mb-5">
            <Input
              {...register("login", { required: true })}
              placeholder="Имя или почта"
              isError={!!errors.login}
            />
          </div>
          <div>
            <Input
              {...register("password", { required: true })}
              placeholder="Пароль"
              type="password"
              isError={!!errors.password}
            />
          </div>
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
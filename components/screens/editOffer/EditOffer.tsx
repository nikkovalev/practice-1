import React, {
  BaseSyntheticEvent,
  FC,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { url } from "@/helpers/url";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useCreateEditOfferMutation } from "@/store/categories/categoriesApi";

import { ICategory, IService } from "@/models/ICategory";
import { IOffer } from "@/models/IOffer";

import { Modal } from "@/components/layouts/modalLayout";
import { Button, Input, Select, SelectHandle, Text } from "@/components/ui";

import { styles as modalStyles } from "@/components/layouts/modalLayout";
import styles from "./EditOffer.module.scss";

interface IEditOffer {
  initial: IOffer;
  categories: ICategory[];
}

export const EditOffer: FC<IEditOffer> = ({ initial, categories }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const router = useRouter();
  // Requests
  const [createEditOffer, { data, isLoading, isSuccess }] = useCreateEditOfferMutation();
  // States
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);
  const [server, setServer] = useState<number | null>(null);
  const [service, setService] = useState<IService | null>(null);
  const categoriesNames = useMemo(() => categories.map((c) => c.name), [categories]);
  const servicesNames = useMemo(
    () => currentCategory?.services.map((s) => s.name) ?? [],
    [currentCategory]
  );
  const serversNames = useMemo(() => currentCategory?.servers ?? [], [currentCategory]);
  const [errorsObj, setErrorsObj] = useState<{ [key: string]: boolean }>({
    category: false,
    server: false,
    service: false,
  });
  const [isCountable, setIsCountable] = useState<boolean>(true);
  const [filtersValues, setFiltersValues] = useState<{ [key: string]: string | null }>({});
  // Refs
  const serviceRef = useRef<SelectHandle>(null);

  const handleClose = () => router.push("/offers");

  const handleChangeCategory = (val: string | null) => {
    if (!val) {
      setCurrentCategory(null);
      setService(null);
      setFiltersValues({});
      serviceRef.current?.reset();
      return;
    }
    const category = categories.find((c) => c.name === val);
    if (!!category) setCurrentCategory(category);
    if (errorsObj.category) setErrorsObj((prev) => ({ ...prev, category: false }));
  };
  const handleChangeServer = (_: string | null, idx?: number) => {
    setServer((idx as number) ?? null);
    if (errorsObj.server) setErrorsObj((prev) => ({ ...prev, server: false }));
  };
  const handleChangeService = (val: string | null) => {
    if (!currentCategory) return;
    const service = currentCategory?.services.find((s) => s.name === val);
    if (service) {
      const filtersValues: { [key: string]: null } = {};
      const filtersErrors: { [key: string]: false } = {};
      service.filters.forEach((filter) => {
        filtersValues[filter.name] = null;
        filtersErrors[filter.name] = false;
      });
      setFiltersValues(filtersValues);
      setService(service);
      setErrorsObj((prev) => ({ ...prev, ...filtersErrors }));
    } else {
      setFiltersValues({});
      setService(null);
    }
    if (errorsObj.service) setErrorsObj((prev) => ({ ...prev, service: false }));
  };
  const handleChangeCountable = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsCountable(!isCountable);
  };
  const handleChangeFilter = (name: string) => (value: string | null) => {
    setFiltersValues((prev) => ({ ...prev, [name]: value }));
    if (!!errorsObj[name]) setErrorsObj((prev) => ({ ...prev, [name]: false }));
  };

  const handleSave = ({ price, quantity, description }: { [key: string]: string }) => {
    const offer = {
      categoryId: currentCategory?.id,
      server,
      serviceId: service?.id,
      filters: [],
      countable: isCountable,
      quantity: isCountable ? +quantity : 1,
      price,
      description,
      currency: "RUB",
    };
    createEditOffer(offer as any);
  };
  const onSubmit = (event: BaseSyntheticEvent<object, any, any>) => {
    const errorsObj: { [key: string]: boolean } = {
      category: false,
      server: false,
      service: false,
    };
    if (!currentCategory) errorsObj.category = true;
    if (!service) errorsObj.service = true;
    if (server === null) errorsObj.server = true;
    Object.keys(filtersValues).forEach((key) => {
      errorsObj[key] = !filtersValues[key];
    });
    if (Object.values(errorsObj).some((v) => !!v)) setErrorsObj(errorsObj);
    handleSubmit(handleSave)(event);
  };

  useEffect(() => {
    if (isSuccess && !!data) {
      toast.success(`Предложение успешно ${!!initial ? "редактировано" : "создано"}`);
      router.push("/offers");
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  return (
    <Modal
      className={styles.modal}
      title={
        !!initial ? `Редактирование предложения - ${initial.description}` : "Создание предложения"
      }
      handleClose={handleClose}
    >
      <div className={cn(modalStyles.top, styles.top)}>
        <Text as="h1" size="xxl" align="center" weight={700}>
          {!!initial ? "Измените предложение" : "Добавьте предложение"}
        </Text>
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.selects}>
          <div>
            <Text className={styles.label} color="gray" weight={500} size="m">
              Категория
            </Text>
            <Select
              className={cn({
                [styles.selectWithIcon]: !!currentCategory,
              })}
              label="Выберите категорию"
              items={categoriesNames}
              icon={
                currentCategory && (
                  <div
                    className={styles.icon}
                    style={{ backgroundImage: url(currentCategory.icon) }}
                  />
                )
              }
              iconCN="mr-[10px]"
              size="large"
              color="light"
              isError={errorsObj.category}
              handleChange={handleChangeCategory}
            />
          </div>
          <div>
            <Text className={styles.label} color="gray" weight={500} size="m">
              Тип услуги
            </Text>
            <Select
              ref={serviceRef}
              label="Выберите тип услуги"
              items={servicesNames}
              size="large"
              color="light"
              isError={errorsObj.service}
              handleChange={handleChangeService}
            />
          </div>
          <div>
            <Text className={styles.label} color="gray" weight={500} size="m">
              Сервер
            </Text>
            <Select
              label="Выберите сервер"
              items={serversNames}
              size="large"
              color="light"
              isError={errorsObj.server}
              handleChange={handleChangeServer}
            />
          </div>
          {!!service &&
            service.filters.map((filter) => (
              <div key={filter.id}>
                <Text className={styles.label} color="gray" weight={500} size="m">
                  {filter.name}
                </Text>
                <Select
                  label={filter.name}
                  items={filter.values}
                  size="large"
                  color="light"
                  isError={!!errorsObj[filter.name]}
                  handleChange={handleChangeFilter(filter.name)}
                />
              </div>
            ))}
        </div>
        <textarea
          {...register("short_description", { required: true })}
          className={cn(styles.textarea, {
            [styles.textarea_error]: !!errors?.short_description,
          })}
          placeholder="Краткое описание"
        />
        <textarea
          {...register("description", { required: true })}
          className={cn(styles.textarea, styles.textarea_large, {
            [styles.textarea_error]: !!errors?.description,
          })}
          placeholder="Подробное описание"
        />
        <div className={styles.radioWrapper}>
          <Text color="gray" size="m">
            Исчисляемое
          </Text>
          <button className={styles.radio} onClick={handleChangeCountable}>
            <div
              className={styles.radioIndicator}
              style={{
                transform: `translateX(${isCountable ? 0 : 37}px)`,
              }}
            />
            <span>Да</span>
            <span>Нет</span>
          </button>
        </div>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <Input
              {...register("price", { required: true, validate: (v) => !Number.isNaN(Number(v)) })}
              placeholder="Цена за 1 шт."
              withIcon={true}
              isError={!!errors?.price}
            />
            <Text as="b" color="gray" size="s" weight={700}>
              ₽
            </Text>
          </div>
          {isCountable && (
            <div className={cn(styles.input, styles.input_count)}>
              <Input
                {...register("count", {
                  required: true,
                  validate: (v) => !Number.isNaN(Number(v)),
                })}
                placeholder="Наличие, например 6000"
                withIcon={true}
                isError={!!errors?.count}
              />
              <Text as="b" color="gray" size="s" weight={700}>
                шт.
              </Text>
            </div>
          )}
          <Button variant="contained" size="large" isDisabled={isLoading}>
            Добавить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

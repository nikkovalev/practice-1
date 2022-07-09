import React, {
  ChangeEvent,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import cn from "classnames";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { ICategory, IService } from "@/models/ICategory";
import { IGetOffer } from "@/models/IOffer";

import { Header } from "@/components/header/Header";
import { ArrowIcon } from "@/components/icons";
import { CategoryFilters } from "@/components/screens/category/CategoryFilters";
import { Button } from "@/components/ui";
import { Footer } from "@/components/footer/Footer";

import styles from "./CategoryLayout.module.scss";

interface ICategoryLayout {
  children: ReactNode;
  title: string;
  category: ICategory;
  view: "card" | "list";
  getOffers: (data: IGetOffer) => void;
  setView: Dispatch<SetStateAction<"list" | "card">>;
}

export const CategoryLayout: FC<ICategoryLayout> = ({
  children,
  title,
  category,
  view,
  getOffers,
  setView,
}) => {
  const [s, setS] = useState<IService | null>(null);
  const [server, setServer] = useState<number | null>(null);
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const getS = (sId: number) => category.services.find((s) => s.id === sId) ?? null;
  const handleChangeS = (sId: number) => () => {
    setS(getS(sId));
    router.replace(`/categories/${category.slug}?page=${sId}`);
  };
  const handleSelectServer = (_: string | null, idx?: number) => setServer(idx ?? null);
  const handleChangeOrder = () => setOrder(order === "ASC" ? "DESC" : "ASC");
  const handleChangeOnline = () => setOnlineOnly(!onlineOnly);
  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value);

  useEffect(() => {
    if (!category) return;
    const s = router.query.page
      ? getS(parseInt(router.query.page as string))
      : category.services[0] ?? null;
    setS(s);
  }, [category]);

  useEffect(() => {
    if (s) {
      const data: any = {};
      if (!!server) data.server = server;
      if (!!query) data.query = query;
      getOffers({
        categoryId: category.id,
        serviceId: s?.id,
        order,
        onlineOnly,
        ...data,
      });
    }
  }, [s, server, order, onlineOnly, query]);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-black-400 overflow-x-hidden">
      <Head>
        <title>YaonPay - {title}</title>
      </Head>
      <div
        className={cn("page_preview", styles.top)}
        style={{ backgroundImage: `url(${category.banner})` }}
      >
        <Header />
        <div className="mask" />
        <div className="relative z-10">
          <div className="inner-container">
            <Link href={`/?category=${category.slug}`}>
              <a className="flex items-center">
                <ArrowIcon direction="left" />
                <b>В каталог FIFA</b>
              </a>
            </Link>
            <h1>
              {s?.name} {category.name}
            </h1>
            <p>{s?.description}</p>
          </div>
          <div className={cn("inner-container", styles.buttons)}>
            {category.services.map((i) => (
              <Button
                key={i.id}
                className={styles.button}
                variant="outlined"
                isActive={s?.id === i.id}
                onClick={handleChangeS(i.id)}
              >
                {i.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-grow container page_content">
        <CategoryFilters
          category={category}
          filters={s?.filters ?? []}
          view={view}
          handleSelectServer={handleSelectServer}
          handleChangeOrder={handleChangeOrder}
          handleChangeOnline={handleChangeOnline}
          handleChangeQuery={handleChangeQuery}
          setView={setView}
        />
        {children}
      </div>
      <Footer />
    </div>
  );
};

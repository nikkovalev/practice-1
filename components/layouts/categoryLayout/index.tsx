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
import Link from "next/link";
import { useRouter } from "next/router";

import { ICategory, IService } from "@/models/ICategory";
import { IGetOffer } from "@/models/IOffer";

import { Layout } from "../Layout";
import { ArrowIcon } from "@/components/icons";
import { CategoryFilters } from "@/components/screens/category/CategoryFilters";
import { Button } from "@/components/ui";
import { Preview } from "../previewLayout";

import styles from "./CL.module.scss";

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
    <Layout title={title} withImage={true}>
      <Preview withMask={true} bg={category.banner ?? ""}>
        <div className="inner-container">
          <Link href={`/?category=${category.slug}`}>
            <a className="link_with_arrow">
              <ArrowIcon direction="left" />
              <b>В каталог {category.name}</b>
            </a>
          </Link>
          <h1 className="page__title">
            {s?.name} {category.name}
          </h1>
          <p className="page__desc">{s?.description}</p>
        </div>
        <div className={cn("inner-container", styles.buttons)}>
          {category.services.map((i) => (
            <Button
              key={i.id}
              className={styles.button}
              variant="outlined"
              color="black"
              size="fit"
              isActive={s?.id === i.id}
              onClick={handleChangeS(i.id)}
            >
              {i.name}
            </Button>
          ))}
        </div>
      </Preview>
      <div className="flex-grow container">
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
    </Layout>
  );
};

import { NextPage } from "next";
import { Modal } from "@/components/modal/Modal";
import { Link } from "@/components/link";

const NotFound: NextPage = () => {
  return (
    <Modal hideClose>
      <div>
        <h3 className="text-white-100 text-4xl font-bold sm:text-xl">Произошла ошибка!</h3>
        <div className="text-center mt-5">
          <Link href="/">
            <a className="text-secondary-400 hover:underline">Вернуться на главную</a>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
export default NotFound;

import { NextPage } from "next";

import { Modal } from "@/components/layouts/modalLayout";
import { Link } from "@/components/ui";

const NotFound: NextPage = () => (
  <Modal hideClose>
    <div>
      <h3 className="text-white-100 text-4xl font-bold sm:text-xl">Произошла ошибка!</h3>
      <div className="text-center mt-5">
        <Link href="/" className="text-secondary-400 hover:underline">
          Вернуться на главную
        </Link>
      </div>
    </div>
  </Modal>
);
export default NotFound;

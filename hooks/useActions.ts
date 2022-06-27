import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { authActions } from "@/store/auth/authSlice";
import { globalActions } from "@/store/global/globalSlice";

const allActions = {
  ...authActions,
  ...globalActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};

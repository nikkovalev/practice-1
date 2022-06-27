import { useSelector, TypedUseSelectorHook } from "react-redux";
import { TypeRootState } from "@/store/store";

export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector;

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// typed dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
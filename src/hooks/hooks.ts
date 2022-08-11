import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;

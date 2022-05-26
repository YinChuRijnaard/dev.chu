//@ts-ignore
import loaderStyle from "../styles/Loader.module.css";

export default function Loader({ show }) {
  return show ? <div className={loaderStyle.loader}></div> : null;
}

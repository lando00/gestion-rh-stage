import { useContext } from "react";
import CustomeContext from "./CustomeContext";

const useCustomeContext = () => {

    return useContext ( CustomeContext );

}

export default useCustomeContext;
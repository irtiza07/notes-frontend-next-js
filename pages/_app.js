import { UserContextProvider } from "../utils/state";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContextProvider>
  );
}

export default MyApp;

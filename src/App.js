import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import CardsList from "./components/CardsList/CardsList";
import SideMenu from "./components/SideMenu/SideMenu";

import TopMenu from "./components/TopMenu/TopMenu";
import SideEditPanel from "./components/SideEditPanel/SideEditPanel";

import { SettingsLoader } from "./features/settings/components/SettingsLoader";
import { usePersonsList } from "./hooks/usePersonsList";

function App() {
  const [isFull, setIsFull] = useState(true);

  const { activePerson } = usePersonsList();

  return (
    <SettingsLoader>
      <Flex size={"sx"}>
        <SideMenu isFull={isFull} setIsFull={setIsFull} />
        <Flex flexDirection={"column"} marginLeft={isFull ? "300px" : "80px"} width={"100%"} marginRight={activePerson ? "300px" : "0"}>
          {/* <Heading>Это приложение написанное с использованием Чакра УИ</Heading> */}
          {/* <Button>Кнопка</Button> */}
          <TopMenu />
          <CardsList />
        </Flex>
        <SideEditPanel isFull={isFull} />
      </Flex>
    </SettingsLoader>
  );
}

export default App;

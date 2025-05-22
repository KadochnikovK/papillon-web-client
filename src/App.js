import store from "./app/store";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import CardsList from "./components/CardsList/CardsList";
import SideMenu from "./components/SideMenu/SideMenu";
import { MyProvider } from "./components/ui/provider";
import theme from "./theme";
import items from "./content/data/cartsList";
import TopMenu from "./components/TopMenu/TopMenu";
import SideEditPanel from "./components/SideEditPanel/SideEditPanel";


function App() {
  const [selection, setSelection] = useState([]);
  const [isFull, setIsFull] = useState(true);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(true);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  return (
    <MyProvider store={store} theme={theme}>
      <Flex size={"sx"}>
        <SideMenu isFull={isFull} setIsFull={setIsFull} />
        <Flex flexDirection={"column"} marginLeft={isFull ? "300px" : "80px"} width={"100%"} marginRight={isEditPanelOpen ? "300px" : "80px"}>
          {/* <Heading>Это приложение написанное с использованием Чакра УИ</Heading> */}
          {/* <Button>Кнопка</Button> */}
          <TopMenu />
          <CardsList hasSelection={hasSelection} indeterminate={indeterminate} selection={selection} setSelection={setSelection} items={items} />
        </Flex>
        <SideEditPanel />
      </Flex>
    </MyProvider>
  );
}

export default App;

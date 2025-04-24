import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import CardsList from "./components/CardsList/CardsList";
import SideMenu from "./components/SideMenu/SideMenu";
import { Provider } from "./components/ui/provider";
import theme from "./theme";
import items from "./content/data/cartsList";
import TopMenu from "./components/TopMenu/TopMenu";


function App() {
  const [selection, setSelection] = useState([]);
  const [isFull, setIsFull] = useState(true)

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  return (
    <Provider theme={theme}>
      <Flex size={"sx"}>
        <SideMenu isFull={isFull} setIsFull={setIsFull}/>
        <Flex gap={'40px'} flexDirection={'column'} marginLeft={isFull ? '300px' : '80px'} padding={"8"} bg={"lightGray"} width={"100%"}>
          {/* <Heading>Это приложение написанное с использованием Чакра УИ</Heading> */}
          {/* <Button>Кнопка</Button> */}
          <TopMenu />
          <CardsList
            hasSelection={hasSelection}
            indeterminate={indeterminate}
            selection={selection}
            setSelection={setSelection}
            items={items}
          />
        </Flex>
      </Flex>
    </Provider>
  );
}

export default App;

import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import CardsList from "./components/CardsList/CardsList";
import SideMenu from "./components/SideMenu/SideMenu";
import items from "./content/data/cardsList";
import TopMenu from "./components/TopMenu/TopMenu";
import SideEditPanel from "./components/SideEditPanel/SideEditPanel";
import { useSelector } from "react-redux";
import { SettingsLoader } from "./features/settings/components/SettingsLoader";

function App() {

  const persone = useSelector((state) => state.persone.data);
  const isExistPersone = persone.text.employee_id;
  // const settings = useSelector((state) => state.settings.data);
  const [selection, setSelection] = useState([]);
  const [isFull, setIsFull] = useState(true);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  // useEffect(() => {
  //   dispatch(fetchSettings());
  // }, []);

  return (
    <SettingsLoader>
      <Flex size={"sx"}>
        <SideMenu isFull={isFull} setIsFull={setIsFull} />
        <Flex flexDirection={"column"} marginLeft={isFull ? "300px" : "80px"} width={"100%"} marginRight={isExistPersone ? "300px" : "0"}>
          {/* <Heading>Это приложение написанное с использованием Чакра УИ</Heading> */}
          {/* <Button>Кнопка</Button> */}
          <TopMenu />
          <CardsList hasSelection={hasSelection} indeterminate={indeterminate} selection={selection} setSelection={setSelection} items={items} />
        </Flex>
        <SideEditPanel isFull={isFull} />
      </Flex>
    </SettingsLoader>
  );
}

export default App;

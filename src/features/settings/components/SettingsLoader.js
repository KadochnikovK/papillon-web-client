import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from '../settingsSlice';
import { Spinner, Flex, Box } from '@chakra-ui/react';

export function SettingsLoader({ children }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.settings);

  useEffect(() => {
    if (!data && !loading && !error) {
      dispatch(fetchSettings());
    }
  }, [data, loading, error, dispatch]);

  if (loading || !data) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Box color="red.500">Ошибка загрузки настроек: {error}</Box>
      </Flex>
    );
  }

  return children;
}
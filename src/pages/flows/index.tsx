import { AddIcon } from '@chakra-ui/icons';
import {
  Heading,
  IconButton,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FlowCard from '../../components/Card/FlowCard';
import CreateFlowModal from '../../components/models/CreateFlowModal';
import Navbar from '../../components/NavBars/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useUser } from '../../context/user.context';
import { API } from '../../data/api';
import { PolyglotFlow } from '../../types/polyglotElements';

const FlowIndexPage = () => {
  const [flows, setFlows] = useState<PolyglotFlow[]>([]);
  const { user, loading } = useUser();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const {
    isOpen: cfOpen,
    onClose: cfOnClose,
    onOpen: cfOnOpen,
  } = useDisclosure();

  const router = useRouter();
  const query = router.query?.q?.toString();

  useEffect(() => {
    API.autocomplete(searchValue).then((resp) => {
      const payload = resp.data;
      setSuggestions(payload);
    });
  }, [searchValue]);

  useEffect(() => {
    if (user) {
      API.loadFlowList(query).then((resp) => {
        setFlows(resp.data);
      });
    }
  }, [user, query]);

  if (!user && loading) return null;

  return (
    <>
      <Navbar user={user} />
      <Heading px="10%" pt="5%">
        Navigate Flows
      </Heading>
      <SearchBar
        inputValue={searchValue}
        setInputValue={setSearchValue}
        items={suggestions}
      />
      <VStack alignItems={'center'}>
        {flows.length ? (
          flows.map((flow, id) => <FlowCard key={id} flow={flow} />)
        ) : (
          <Heading size={'md'} textAlign="center">
            No flows found! <br />
            Search something different ;)
          </Heading>
        )}
      </VStack>
      <Tooltip label="Create Flow">
        <IconButton
          aria-label="Create Flow"
          position={'fixed'}
          right={10}
          bottom={10}
          rounded="full"
          bg={'blue.400'}
          w={12}
          h={12}
          _hover={{ bg: 'blue.600' }}
          icon={<AddIcon fontSize={'xl'} color="white" />}
          onClick={cfOnOpen}
        />
      </Tooltip>
      <CreateFlowModal isOpen={cfOpen} onClose={cfOnClose} />
    </>
  );
};

export default FlowIndexPage;

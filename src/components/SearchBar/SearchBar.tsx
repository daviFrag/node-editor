import { SearchIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

type SearchItems = string[];

type SearchBarProps = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  items: SearchItems;
};

export default function SearchBar({
  inputValue,
  setInputValue,
  items,
}: SearchBarProps) {
  const router = useRouter();
  return (
    <Flex align="center" px="10%" py="5%">
      <AutoComplete
        openOnFocus
        value={inputValue}
        onSelectOption={(e) => {
          setInputValue(e.item.value);
          router.push(router.pathname + '?q=' + e.item.value);
        }}
      >
        <AutoCompleteInput
          variant="filled"
          placeholder="Search Flows..."
          onChange={(e) => {
            e.preventDefault();
            setInputValue(e.currentTarget.value);
          }}
        />
        <AutoCompleteList>
          {items.map((country, cid) => (
            <AutoCompleteItem
              key={`option-${cid}`}
              value={country}
              textTransform="capitalize"
            >
              {country}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
      <IconButton
        aria-label="Search database"
        icon={<SearchIcon />}
        ml="1"
        onClick={(e) => {
          e.preventDefault();
          router.push(router.pathname + '?q=' + inputValue);
        }}
      />
    </Flex>
  );
}
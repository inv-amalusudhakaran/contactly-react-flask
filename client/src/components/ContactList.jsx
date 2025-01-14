import { Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ContactCard from './ContactCard';
import { BASE_URL } from '../config/constants';

const ContactList = ({ contacts, setContacts }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Fetch contacts from the server
  const getContacts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/contacts`);
      const data = await response.json();
      // TODO: Handle error based on data return from backend
      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch contacts.');
      }
      setContacts(data.data.contacts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the data is still loading, display a spinner
  if (isLoading) {
    return (
      <Flex mt={8} justifyContent={'center'}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  // If there are no contacts, display a message
  if (!contacts || contacts.length === 0) {
    return (
      <Flex mt={8} justifyContent={'center'}>
        No contacts found.
      </Flex>
    );
  }

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
      {contacts?.map((contact) => (
        <ContactCard
          setContacts={setContacts}
          key={contact.id}
          contact={contact}
        />
      ))}
    </SimpleGrid>
  );
};
export default ContactList;

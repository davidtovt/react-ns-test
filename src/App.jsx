import { useState } from 'react';

import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState({});

  const openModal = async () => {
    await getRandomContent();

    setIsOpen(true);
  };

  const fetchData = async () => {
    const response = await fetch('./data/content.json');
    return await response.json();
  };

  const getRandomContent = async () => {
    const events = await fetchData();
    const randomId = Math.floor(Math.random() * events.length);

    setEvent(events[randomId]);
  };

  return (
    <div className="d-flex text-end p-2">
      <Button handleClick={openModal}>
        Open Modal
      </Button>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} content={event} />
    </div>
  );
}

export default App;

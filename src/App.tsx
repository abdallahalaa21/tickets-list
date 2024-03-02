import { useRef, useState, useLayoutEffect } from 'react';
import Navbar from './components/navbar';
import useGetData from './hooks/useData';
import Modal from './components/modal';
import List from './components/list';

function App() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(180);
  const { createItem, data, loading, updateItem } = useGetData();

  useLayoutEffect(() => {
    if (ref.current) {
      setContainerHeight(ref.current.clientHeight);
    }
  }, [ref.current]);

  return (
    <>
      <div ref={ref}>
        <Navbar />
        <div className='flex gap-2  items-center'>
          <h1 className='text-3xl font-bold p-4'>Tickets</h1>

          <button
            data-modal-target='authentication-modal'
            data-modal-toggle='authentication-modal'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            type='button'
            onClick={() => setOpen(true)}
          >
            Add Ticket
          </button>
        </div>
        <div className='mx-1'>
          <div className='flex justify-between p-4 bg-gray-100 '>
            <div className='flex-1'>Subject</div>
            <div className='flex-1'>Priority</div>
            <div className='flex-1'>Status</div>
            <div className='flex-1'>Description</div>
            <div className='w-16'>Actions</div>
          </div>
        </div>
      </div>
      <List
        itemHeight={70}
        otherComponentHeight={containerHeight}
        items={data}
        loading={loading}
        updateItem={updateItem}
      />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onOk={createItem}
        title='Add Ticket'
      />
    </>
  );
}

export default App;

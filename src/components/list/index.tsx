import { UIEvent, useCallback, useMemo, useState } from 'react';
import { TItem } from '../../types';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import ElementWrapper from './ElementWrapper';
import Modal from '../modal';

const margin = 8;

const loadingArray = Array.from({ length: 30 });

type ListProps = {
  itemHeight: number;
  otherComponentHeight: number;
  items: TItem[];
  loading: boolean;
  updateItem: (data: TItem) => void;
};

const List = ({
  itemHeight,
  otherComponentHeight,
  items,
  loading,
  updateItem,
}: ListProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const { height } = useWindowDimensions();

  const itemHeightWithMargin = useMemo(() => itemHeight + margin, [itemHeight]);

  const containerHeight = useMemo(
    () => height - otherComponentHeight,
    [height, otherComponentHeight]
  );

  const startIndex = Math.floor(scrollTop / itemHeight);

  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeightWithMargin),
    items.length
  );
  const visibleItems = items.slice(startIndex, endIndex);

  const invisibleItemsHeight =
    (startIndex + visibleItems.length - endIndex) * itemHeight;

  const handleScroll = useCallback((e: UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      style={{ height: `${containerHeight}px` }}
      onScroll={handleScroll}
      className='overflow-y-auto'
    >
      <div style={{ height: `${items.length * itemHeight}px` }}>
        <div
          style={{
            height: `${visibleItems.length * itemHeight}px`,
            top: `${startIndex * itemHeight}px`,
            gap: `${margin}px`,
          }}
          className='relative flex flex-col'
        >
          {loading
            ? loadingArray.map((_, index) => (
                <ElementWrapper key={index} itemHeight={itemHeight}>
                  <div className='animate-pulse bg-gray-200 h-10 w-full rounded-md' />
                </ElementWrapper>
              ))
            : visibleItems.map((item: TItem) => (
                <ElementWrapper key={item.id} itemHeight={itemHeight}>
                  <div className='flex-1'>{item.subject}</div>
                  <div className='flex-1 '>{item.priority}</div>
                  <div className='flex-1'>{item.status}</div>
                  <div className='flex-1'>{item.description}</div>
                  <button
                    type='button'
                    onClick={() => setSelectedItem(item)}
                    className='w-16 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  >
                    Edit
                  </button>
                </ElementWrapper>
              ))}
        </div>
        <div style={{ height: `${invisibleItemsHeight}px` }} />
        {selectedItem && (
          <Modal
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            onOk={updateItem}
            title='Edit Ticket'
            data={selectedItem}
          />
        )}
      </div>
    </div>
  );
};

export default List;

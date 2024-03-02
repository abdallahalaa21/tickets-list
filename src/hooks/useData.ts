import { useCallback, useEffect, useState } from 'react';
import { TItem } from '../types';

const priorityMap = ['Low', 'Medium', 'High'];
const statusMap = ['Open', 'In Progress', 'Done'];

const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  subject: `Item ${i + 1}`,
  priority: priorityMap[Math.floor(Math.random() * 3)],
  status: statusMap[Math.floor(Math.random() * 3)],
  description: `Description for item ${i + 1}`,
}));

const useGetData = () => {
  const [data, setData] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setData(items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }, []);

  const updateItem = useCallback((item: Partial<TItem>) => {
    setLoading(true);
    setData((prevData) =>
      prevData.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, ...item } : prevItem
      )
    );
    setLoading(false);
  }, []);

  const createItem = useCallback((item: TItem) => {
    setLoading(true);
    setData((prevData) => [
      {
        ...item,
        id: prevData.length,
      },
      ...prevData,
    ]);
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, createItem, updateItem };
};

export default useGetData;

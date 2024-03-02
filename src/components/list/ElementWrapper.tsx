type ElementWrapperProps = {
  children: React.ReactNode;
  itemHeight: number;
};

const ElementWrapper = ({ children, itemHeight }: ElementWrapperProps) => (
  <div
    style={{ height: `${itemHeight}px` }}
    className='flex items-baseline justify-between border-b border-gray-300 p-4 bg-white shadow-md '
  >
    {children}
  </div>
);

export default ElementWrapper;

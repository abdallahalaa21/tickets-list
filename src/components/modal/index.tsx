import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TItem } from '../../types';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onOk: (data: TItem) => void;
  data?: TItem;
};

const Modal = ({ isOpen, onClose, title, onOk, data }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TItem>({
    defaultValues: {
      subject: data?.subject || '',
      priority: data?.priority || '',
      description: data?.description || '',
      status: data?.status || 'Open',
    },
  });

  const onCancel = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onSubmit: SubmitHandler<TItem> = useCallback(
    (formData) => {
      const newData = data?.id ? { ...formData, id: data.id } : { ...formData };

      onOk(newData);
      onCancel();
    },
    [onOk, onCancel, data]
  );

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className='flex items-center justify-center min-h-screen p-4 text-center'>
        <div
          className='fixed inset-0 bg-black opacity-50'
          onClick={onCancel}
        ></div>

        <div className='relative w-full max-w-2xl max-h-full p-4'>
          <div className='relative bg-white rounded-lg shadow '>
            <div className='flex items-center justify-between p-4 border-b rounded-t md:p-5 '>
              <h3 className='text-xl font-semibold text-gray-900 '>{title}</h3>
              <button
                type='button'
                className='inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto '
                data-modal-hide='default-modal'
                onClick={onCancel}
              >
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='p-4 space-y-4 md:p-5'>
                <div className='flex flex-col gap-3'>
                  <div className='flex items-baseline justify-between gap-4'>
                    <label
                      htmlFor='subject'
                      className='text-sm font-medium text-gray-900 '
                    >
                      Subject
                    </label>
                    <div className='flex flex-col items-start w-10/12 '>
                      <input
                        type='text'
                        id='subject'
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-transparent'
                        {...register('subject', { required: true })}
                      />
                      {errors.subject && (
                        <span className='text-red-500'>
                          Subject is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center justify-between gap-4'>
                    <label
                      htmlFor='priority'
                      className='text-sm font-medium text-gray-900 '
                    >
                      Priority
                    </label>
                    <div className='flex flex-col items-start w-10/12 '>
                      <select
                        id='priority'
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-transparent'
                        {...register('priority', { required: true })}
                      >
                        <option value='' disabled>
                          Select priority
                        </option>
                        <option value='Low'>Low</option>
                        <option value='Medium'>Medium</option>
                        <option value='High'>High</option>
                      </select>
                      {errors.priority && (
                        <span className='text-red-500'>
                          Priority is required
                        </span>
                      )}
                    </div>
                  </div>

                  {data?.status && (
                    <div className='flex items-center justify-between gap-4'>
                      <label
                        htmlFor='status'
                        className='text-sm font-medium text-gray-900 '
                      >
                        Status
                      </label>
                      <div className='flex flex-col items-start w-10/12 '>
                        <select
                          id='status'
                          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-transparent'
                          {...register('status', { required: true })}
                        >
                          <option value='' disabled>
                            Select status
                          </option>
                          <option value='Open'>Open</option>
                          <option value='In Progress'>In Progress</option>
                          <option value='Done'>Done</option>
                        </select>
                        {errors.status && (
                          <span className='text-red-500'>
                            Status is required
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className='flex items-center justify-between gap-4'>
                    <label
                      htmlFor='description'
                      className='text-sm font-medium text-gray-900 '
                    >
                      Description
                    </label>
                    <div className='flex flex-col items-start w-10/12 '>
                      <textarea
                        id='description'
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-transparent'
                        {...register('description', { required: true })}
                      />
                      {errors.description && (
                        <span className='text-red-500'>
                          Description is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center p-4 border-t border-gray-200 rounded-b md:p-5 '>
                <button
                  data-modal-hide='default-modal'
                  type='submit'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
                >
                  Save
                </button>
                <button
                  data-modal-hide='default-modal'
                  type='button'
                  className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100  '
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

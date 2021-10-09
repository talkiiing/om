// @ts-nocheck
import { useDropzone } from 'react-dropzone';
import { DownloadIcon } from '@heroicons/react/outline';

import List from '../../ui/ListSet/List';

const Dropzone = (props) => {
  const { onDrop } = props;

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='w-full h-full'>
      <div { ...getRootProps({ className: 'flex justify-center items-center' }) }>
        <input { ...getInputProps() } />
        <div className='flex flex-col items-center gap-4'>
          <DownloadIcon className='w-20 h-20 text-[#8D8D8D]' />
          <p className='text-[#8D8D8D]'>
            Перетащите сюда ваши данные в формате json или csv
          </p>
        </div>
      </div>
    </div>
  );
};

const  Datasets = () => {
  const datasets = [
    { text: 'Ростелеком' },
    { text: 'ВТБ' },
    { text: 'Яндекс' },
  ];

  return (
    <div
      className='w-full h-full py-8 px-16
      flex flex-col items-center justify-between'
    >
      <div className='w-full flex flex-col items-center gap-6'>
        <h2 className='text-white text-3xl'>Наборы данных</h2>
        <List className='w-full' elements={datasets} />
      </div>
      <div className='w-full flex flex-col items-center gap-6'>
        <p className='text-white text-3xl'>Или загрузите свой набор данных</p>
        <div className='bg-omgray w-full rounded-2xl p-8 h-48'>
          <Dropzone onDrop={ (files) => console.log(files) } />
        </div>
      </div>
    </div>
  );
}

export default Datasets;

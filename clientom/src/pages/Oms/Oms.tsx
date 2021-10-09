import { useState } from 'react';
import useInput from '../../ui/utils/useInput';

import { ChevronRightIcon } from '@heroicons/react/outline';
import Input from '../../ui/Input'

interface Om {
  name: string
  description: string
}

interface OmProps {
  om: Om
}

const OmItem = (props: OmProps) => {
  const { om } = props;

  return (
    <div className='bg-omgray2 rounded-2xl p-6 flex flex-row
    justify-between items-center'
    >
      <div>
        <h3 className='text-white text-2xl'>{ om.name }</h3>
        <p className='text-white'>{ om.description }</p>
      </div>
      <ChevronRightIcon className='text-white w-8 h-8'/>
    </div>
  );
};

const Oms = () => {
  const [oms, setOms] = useState([
    {
      name: 'when',
      description: 'when',
    },
    {
      name: 'imposter',
      description: 'imposter',
    },
    {
      name: 'is',
      description: 'is',
    },
    {
      name: 'sus',
      description: 'sus',
    },
  ]);

  const searchModel = useInput('');

  const showSearchResult = (os: Om[], sv: string) => os
    .filter((o) => sv.length > 0 ? (
        o.name.includes(sv)
        || o.description.includes(sv)
      ) : true)
    .map((o, i) => <OmItem om={ o } key={ i }/>);

  return (
    <div
      className='w-full h-full py-8 px-16
      flex flex-col items-center justify-between'
    >
      <h2 className='text-white text-3xl'>Маркетплейс Om</h2>
      <div className='flex flex-col gap-6 w-full items-center px-10'>
        <div className='w-full'>
          <Input model={ searchModel } label='Найти'/>
        </div>
        <div
          className='w-full grid gap-6 grid-cols-3'
        >
          { showSearchResult(oms, searchModel.value).length !== 0
            ? showSearchResult(oms, searchModel.value)
            : <h3 className='text-white'>Ничего не найдено :(</h3>
          }
        </div>
      </div>
    </div>
  );
};

export default Oms;

import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import backly from '../../services/backly/backly'
import BindingModel from '../../models/binding.model'
import UserModel from '../../models/user.model'
import { Paginated } from '@feathersjs/feathers'
import Card from './Card/Card'

const VirtualCashier = () => {
  const [selectedBds, selectBds] = useState<BindingModel>()
  const [list, setList] = useState<BindingModel[]>()
  const [filteredList, setFilteredList] = useState<BindingModel[]>()

  const fetchList = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}') as UserModel
    try {
      const res = (await backly.app.service('bindings').find({
        query: {
          user: user._id,
          active: true,
          // submitted: false
          $limit: 100
        },
      })) as Paginated<BindingModel>
      setList(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    console.log(list)
    if (list) {
      setFilteredList(list.filter((v) => v.active))
    } else {
      setFilteredList([])
    }
  }, [list])

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="flex flex-col space-y-4 mx-auto items-center text-center">
      <h1 className="text-center text-4xl mt-10 mb-3 w-full">
        Подтверждение связок
      </h1>
      <div className="w-full flex flex-col space-y-5">
        {!list ? (
          <div className="w-full text-gray-600 text-xl rounded-md font-light px-3 py-1">
            Загрузка...
          </div>
        ) : filteredList && filteredList.length > 0 ? (
          filteredList.map(
            (v) => v.active && <Card entity={v.entity} active={v.active} />
          )
        ) : (
          <div className="w-full text-gray-600 text-xl rounded-md font-light px-3 py-1">
            К сожалению, ничего...
          </div>
        )}
      </div>
      <Footer options={['settings', 'back']} />
    </div>
  )
}

export default VirtualCashier

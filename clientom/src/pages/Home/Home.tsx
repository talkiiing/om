import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import UserModel from '../../models/user.model'
import {
  QrcodeIcon,
} from '@heroicons/react/outline'
import useSelect from '../../ui/utils/useSelect'
import Select, { IOptionModel } from '../../ui/Select'
import useContextMenu from '../../ui/ContextMenu/useContextMenu'
import { Motion, spring } from 'react-motion'
import ActionCard from '../../ui/ActionCard/ActionCard'
import List from '../../ui/ListSet/List'

export const EOptions: IOptionModel[] = [
  { id: 'one', value: 'One' },
  { id: 'two', value: 'Two' },
  { id: 'three', value: 'Three' },
  { id: 'four', value: 'Four' },
]

const Home = () => {

  // @ts-ignore
  return (
    <>
      
    </>
  )
}

export default Home

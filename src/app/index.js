import { Redirect, Slot } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'

const Root = () => {
  return (
    <Redirect href="/home"/>
  )
}

export default Root
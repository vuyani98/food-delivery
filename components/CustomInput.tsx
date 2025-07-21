import { CustomInputProps } from '@/type';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import cn from 'clsx';

const CustomInput = ({ 
    placeholder = 'Enter text', 
    value, 
    onChangeText, 
    label, 
    secureTextEntry = false,
    keyboardType = 'default',
}: CustomInputProps) => {

    const [isFocused, setIsFocused] = useState(false)


  return (
    <View className='w-full'>
      <Text className='label'>{label}</Text>
      <TextInput
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={isFocused ? '#000' : '#888'}
        className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')}
      />
    </View>
  )
}

export default CustomInput
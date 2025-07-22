import { images } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {

    const params = useLocalSearchParams<{ query: string }>();
    const [query, setQuery] = useState(params.query);

    const debouncedSearch = useDebouncedCallback((text: string) => router.push(`/search?query=${text}`), 1000);

    const handleSearch = (text: string) => {

        setQuery(text);
        debouncedSearch(text);
    }

    return (
        <View className='searchbar'>
            <TextInput className='flex-1 p-5' 
                placeholder='Search for pizzas, burgers...'
                placeholderTextColor='#A0A0A0'
                autoCapitalize='none'
                autoCorrect={false}
                value={query}
                onChangeText={handleSearch}

            />
            <TouchableOpacity className='pr-5' onPress={() => console.log('Search pressed')}>
                <Image 
                    source={images.search}
                    className='size-6'
                    resizeMode='contain'
                    tintColor="#5D5F6D"
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar
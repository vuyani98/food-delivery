import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import cn from 'clsx';
import { Redirect, Slot, Tabs } from 'expo-router';
import { Image, Text, View } from "react-native";

const TabBarIcon = ({focused, icon, title}: TabBarIconProps) => (

  <View className="tab-icon">
    <Image source={icon} className="size-7" resizeMode="contain" tintColor={focused ? '#FE8COO' : '#5D5F6'}/>
    <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')} >{title}</Text>
  </View>
)

export default function TabLayout() {

    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />

  return <Tabs
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginHorizontal: 20,
        height: 80,
        position: 'absolute',
        bottom: 40,        
        elevation: 5,
        shadowColor: '#1a1a1a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      headerShown: false,
      tabBarShowLabel: false,
    }}
  >

    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} title="Home" icon={images.home}/>
      }}
    />
        <Tabs.Screen
      name="search"
      options={{
        title: 'Search',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} title="Search" icon={images.search}/>
      }}
    />
        
    <Tabs.Screen
      name="cart"
      options={{
        title: 'Cart',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} title="Cart" icon={images.bag}/>
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} title="Profile" icon={images.person}/>
      }}
    />
    <Slot />

  </Tabs>

}
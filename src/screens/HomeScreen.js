import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {StatusBar} from 'expo-status-bar'
import {BellIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { themeColors } from '../theme';
import { Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Categories from '../component/categories'
import axios from 'axios';
import Recipes from '../component/recipes'


export default function HomeScreen() {

  const [activeCategory,setActiveCategory] = useState('Dessert');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(()=> {
    getCategory();
    getRecipes();
  },[])

  const handleChangeCategory = categories=>{
    getRecipes(categories);
    setActiveCategory(categories);
    setMeals([]);
  }

  const getCategory = async()=>{
    try{
        const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
        // console.log('got categories: ', response.data);
        if(response && response.data){
            setCategories(response.data.categories);
        }

    }catch(err){
      console.log('error:',err.message);
    }
  }

  const getRecipes = async (category="Dessert")=>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log('got recipes: ',response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }

  return (
    <View className = " flex-1 bg-white">
      <StatusBar Style="dark"/>
      <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:50}}
          className="space-y-6 pt-14"
      >
        {/* people icon and bell icon */}
        <View className="mx-4 flex-row justify-between  items-center mb-2">
            <Image source={require('../../assets/image/main01.jpg')} style={{height:hp(5), width:hp(5.5)}}/>
            <BellIcon size={hp(4)} color="gray"/>
        </View>

        {/* starting text and punchline*/}
        <View className="mx-4 space-y-2 mb-2">
          <Text style= {{fontSize:hp(1.7)}} className="text-neutral-700">Hello , User!</Text>
          <View>
            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-700">Taste the difference with{ /* use this: You are what you eat! with our recipes  */}</Text>
          </View>
          <Text style={{fontSize:hp(3.8)}} className="font-semibold text-amber-500" > our recipes</Text>
        </View>

        {/*seach bar
        <View className="mx-4 flex-row items-center rounded-full bg-black/10 p-[6px]">
          <TextInput className="flex-1 text-base mb-1 pl-3 tracking-wider" placeholder='What to make something new ,Search here' style={{fontSize:hp(1.7)}} />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray"/>
          </View>
        </View> */}


        {/* Categories */}
        <View>
          {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
        </View>

        {/* recipes code*/}
        <View>
        <Recipes meals={meals} categories={categories} />

        </View>
      </ScrollView>
      
    </View>
  )
}
import { StyleSheet, Text, ScrollView } from 'react-native';
import { globalStyles } from '@/styles/global';
import HomeHeader from '@/components/HomeHeader';
import { Link, useFocusEffect } from 'expo-router';
import MacroGrid from '@/components/MacroGrid';
import RecentMeals from '@/components/RecentMeals';
import { useCallback, useState } from 'react';
import { getMeals, Meal } from '@/storage/meals';

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const fetchMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <HomeHeader />
      <MacroGrid meals={meals} />
      <RecentMeals meals={meals} onDelete={fetchMeals} />
    </ScrollView>
  );
}

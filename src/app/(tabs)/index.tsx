import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { globalStyles } from '@/styles/global';
import HomeHeader from '@/components/HomeHeader';
import { Link, useFocusEffect } from 'expo-router';
import MacroGrid from '@/components/MacroGrid';
import RecentMeals from '@/components/RecentMeals';
import { useCallback, useState } from 'react';
import { getMeals, Meal } from '@/storage/meals';
import ShareButton from '@/components/ShareButton';

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
      <View style={styles.header}>
        <Text style={globalStyles.title}>MacroZone</Text>
        <ShareButton meals={meals} />
      </View>
      <HomeHeader />
      <MacroGrid meals={meals} />
      <RecentMeals meals={meals} onDelete={fetchMeals} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

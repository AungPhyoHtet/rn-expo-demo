import MealItem from '@/components/MealItem';
import { clearAllMeals, getMeals, Meal } from '@/storage/meals';
import { colors, globalStyles } from '@/styles/global';
import { Stack, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, ScrollView, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function MealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    await getMeals().then((data: Meal[]) => {
      setMeals(data);
    });
  };

  const handleClearAll = async () => {
    Alert.alert(
      'Clear All Meals',
      'Are you sure you want to delete all meals?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearAllMeals();
            loadMeals();
          },
        },
      ],
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Meals</Text>
      <View style={styles.container}>
        {meals.length === 0 ? (
          <Text style={globalStyles.empty}>No meals found. Start adding some!</Text>
        ) : (
          meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              onDelete={loadMeals}
            />
          ))
        )}
        {meals.length > 0 && (
          <TouchableOpacity
            style={{ marginTop: 20, alignSelf: 'center' }}
            onPress={handleClearAll}
          >
            <Text style={styles.clearButton}>Clear All Meals</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 40,
  },
  clearButton: {
    color: colors.alert,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React, {useContext} from 'react';
import {View, Text, Switch, TouchableOpacity, StyleSheet} from 'react-native';
import {AppContext} from '../context/AppContext';

export default function SettingsScreen() {
  const {unit, setUnit, categories, setCategories} = useContext(AppContext);

  const toggleUnit = () =>
    setUnit(prev => (prev === 'metric' ? 'imperial' : 'metric'));

  const toggleCategory = cat => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Temperature Unit</Text>
      <View style={styles.unitToggle}>
        <Text
          style={[styles.unitLabel, unit === 'metric' && styles.activeUnit]}>
          °C
        </Text>
        <Switch
          value={unit === 'imperial'}
          onValueChange={toggleUnit}
          thumbColor="#fff"
          trackColor={{false: '#ccc', true: '#4da6ff'}}
        />
        <Text
          style={[styles.unitLabel, unit === 'imperial' && styles.activeUnit]}>
          °F
        </Text>
      </View>

      <Text style={styles.sectionTitle}>News Categories</Text>
      <View style={styles.categoryContainer}>
        {['general', 'business', 'sports', 'technology'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryPill,
              categories.includes(cat) && styles.categoryPillActive,
              styles[`pill_${cat}`],
            ]}
            onPress={() => toggleCategory(cat)}>
            <Text
              style={[
                styles.categoryText,
                categories.includes(cat) && styles.categoryTextActive,
              ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  unitToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  unitLabel: {
    fontSize: 16,
    color: '#888',
    marginHorizontal: 10,
  },
  activeUnit: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryPill: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryPillActive: {
    backgroundColor: '#e6f0ff',
    borderColor: '#007aff',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  categoryTextActive: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  pill_general: {
    borderColor: '#6c757d',
  },
  pill_business: {
    borderColor: '#28a745',
  },
  pill_sports: {
    borderColor: '#dc3545',
  },
  pill_technology: {
    borderColor: '#17a2b8',
  },
});

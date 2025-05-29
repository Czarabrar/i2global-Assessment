import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function NewsCard({article, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={{uri: article.urlToImage}} style={styles.image} />
        <Text style={styles.title}>{article.title}</Text>
        <Text>{article.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    elevation: 1,
  },
  image: {
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
});

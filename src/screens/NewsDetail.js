import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet,
  Linking,
} from 'react-native';

const NewsDetailScreen = ({route}) => {
  const {article} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {article.urlToImage && (
        <Image source={{uri: article.urlToImage}} style={styles.image} />
      )}
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.author}>{article.author || 'Unknown Author'}</Text>
      <Text style={styles.description}>{article.description}</Text>
      <Text style={styles.content}>{article.content}</Text>
      <Button
        title="Read Full Article"
        onPress={() => Linking.openURL(article.url)}
      />
    </ScrollView>
  );
};

export default NewsDetailScreen;

const styles = StyleSheet.create({
  container: {padding: 16, backgroundColor: '#fff'},
  image: {height: 200, borderRadius: 10, marginBottom: 16},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 8},
  author: {fontSize: 14, fontStyle: 'italic', marginBottom: 8},
  description: {fontSize: 16, marginBottom: 8},
  content: {fontSize: 16, marginBottom: 16},
});

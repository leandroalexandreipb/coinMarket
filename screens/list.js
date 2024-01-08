import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets/");
        const json = await response.json();
        setList(json.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const Item = ({ crypto }) => (
    <View style={styles.gridItem}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{crypto.rank + "-" + crypto.name}</Text>
      </View>
    </View>
  );
  return (
    <FlatList
      data={list}
      numColumns={2}
      renderItem={({ item }) => <Item crypto={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 100,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  innerContainer: {
    backgroundColor: "#2098ae",
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

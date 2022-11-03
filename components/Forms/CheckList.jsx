import { View, FlatList, Pressable, StyleSheet, Text } from "react-native";
import { CheckBox, Icon, ListItem } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import SpinnerButton from "../Buttons/SpinnerButton";
import sendSms from "../../utils/sendSms";

export default CheckList = ({ items, selectedItems, setSelectedItems }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    item: {
      padding: 10,
      fontSize: 18,
      color: colors.text,
    },
    title: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },
  });

  const toggleItem = (item) => {
    const selectedItemsIds = selectedItems.map((item) => item.id);

    if (selectedItemsIds.includes(item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const send = () => {
    sendSms(selectedItems);
  }

  return (
    <FlatList
      style={styles.container}
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem key={item.id} bottomDivider>
          <ListItem.Content>
            <ListItem.CheckBox
              title={item.name}
              checked={selectedItems.includes(item)}
              onPress={() => toggleItem(item)}
            />
          </ListItem.Content>
        </ListItem>
      )}
      ListFooterComponent={
        <SpinnerButton action={send}>
          <Text style={{fontWeight: 'bold', color: colors.text}}> Envoyer </Text>
        </SpinnerButton>
      }
    />
  );
};

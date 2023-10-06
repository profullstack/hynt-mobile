import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const CountrySelect = ({ countries }) => {
  const [selected, setSelected] = useState(countries?.["us"]);
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = Object.values(countries).filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.code?.toLowerCase().includes(filter.toLowerCase()) ||
      item.iso3?.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelectItem = (item) => {
    setIsOpen(false);
    setSelected(item);
  };

  const handleFilterValues = () => {
    // Filtering is done on render based on the filter state.
  };

  const inputRef = useRef(null);

  return (
    <View style={styles.dropdown}>
      {selected && (
        <TouchableOpacity
          style={styles.selected}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Image
            style={styles.flagIcon}
            source={countries[selected.code.toLowerCase()].path}
          />
          <Text>{selected.code.toUpperCase()}</Text>
          <TextInput
            value={selected.telephonePrefix || ""}
            style={{
              width:
                (selected.telephonePrefix
                  ? selected.telephonePrefix.length + 2
                  : 3) * 10,
            }}
            editable={false}
          />
        </TouchableOpacity>
      )}
      {isOpen && (
        <FlatList
          data={filteredCountries}
          keyExtractor={(item) => item.code}
          ListHeaderComponent={() => (
            <TextInput
              style={styles.filterInput}
              value={filter}
              onChangeText={setFilter}
              onEndEditing={handleFilterValues}
              ref={inputRef}
            />
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleSelectItem(item)}
            >
              <Image
                style={styles.flagIcon}
                source={countries[item.code.toLowerCase()].path}
              />
              <Text>
                {item.name} ({item.code.toUpperCase()}){" "}
                {item.telephonePrefix || ""}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: "relative",
  },
  selected: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  filterInput: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  flagIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default CountrySelect;

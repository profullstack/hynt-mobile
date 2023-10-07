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
  console.log(countries);
  const [selected, setSelected] = useState(countries?.["us_svg"]);
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
  const selectedKey = selected.code.toLowerCase().replace("-", "_") + "_svg";
  const FlagIcon = countries[selectedKey].path;
  const FlagComponent = (
    <FlagIcon
      key={selectedKey}
      width={30}
      height={20}
      style={styles.flagIcon}
    />
  );

  return (
    <View style={styles.dropdown}>
      {selected && (
        <TouchableOpacity
          style={styles.selected}
          onPress={() => setIsOpen(!isOpen)}
        >
          {FlagComponent}
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
          renderItem={({ item }) => {
            const key = item.code.toLowerCase().replace("-", "_") + "_svg";
            const FlagIcon = countries[key].path;

            const FlagComponent = (
              <FlagIcon
                key={key}
                width={30}
                height={20}
                style={styles.flagIcon}
              />
            );

            return (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelectItem(item)}
              >
                {FlagComponent}

                <Text>
                  {item.name} ({item.code.toUpperCase()}){" "}
                  {item.telephonePrefix || ""}
                </Text>
              </TouchableOpacity>
            );
          }}
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
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
});

export default CountrySelect;

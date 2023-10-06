async function getCountriesData() {
  const countriesModule = await import("./country.json");
  const countries = countriesModule.default;
  const data = {};

  for (const country of countries) {
    const { code } = country;

    data[code.toLowerCase()] = {
      path: require(`../../assets/flags/4x3/${code.toLowerCase()}.svg`),
      ...country,
    };
  }

  return data;
}

export default await getCountriesData();

// TODO: Define a City class with name and id properties
class City {
  constructor(public name: string, public id: string) { }
}
// TODO: Complete the HistoryService class
class HistoryService {
  getSearchHistory() {
    throw new Error('Method not implemented.');
  }
  saveCity(_City: any) {
    throw new Error('Method not implemented.');
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await searchHistory.readFile('/Users/courtneyponder/bootcamp/homework/homework9/Weather-Dashboard/Develop/server/src/service/searchHistory.JSON', 'utf-8');
      const cities = JSON.parse(data);
      return cities.map((city: { name: string; id: string }) => new City(city.name, city.id));
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  }
  filePath(_filePath: any, _arg1: string) {
    throw new Error("Method not implemented.");
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await searchHistory.writeFile('/Users/courtneyponder/bootcamp/homework/homework9/Weather-Dashboard/Develop/server/src/service/searchHistory.JSON', data);
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string): Promise<void> {
    const cities = await this.getCities();
    const newCity = new City(cityName, this.generateId());
    cities.push(newCity);
    await this.write(cities);
  }
  generateId(): string {
    throw new Error("Method not implemented.");
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();

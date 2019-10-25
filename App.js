
import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';




export default class App extends Component {
  constructor() {
    super()
    this.state = { data: [], isLoading: true }
  }

  loadPhotos = () => {
    axios
      .get('https://api.unsplash.com/photos/random?count=5&client_id=6fc305e63d9c4ef958ac19094b344932f5fc1bf408cab292e489f106670d7fda')
      .then(res => {
        this.setState({ data: res.data, isLoading: false });
      })
      .catch(error => {
        console.log('Fetching error ', error);
      })
      .finally(function () {
        console.log('done');
      });
  }
  componentDidMount() {
    this.loadPhotos()
  }



  renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.imageItem}>
          <Image
            style={{ flex: 1 }}
            source={{ uri: item.urls.regular }}
          />
        </View>
        <TouchableWithoutFeedback style={styles.textItem}>
          <Text>{item.user.name}</Text>
          <Text>{item.description}</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    return (


      <View>
        <ScrollView>
          <FlatList
            vertical
            pagingEnabled
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>

    )
  }
}



const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'center',
    width: (Dimensions.get('window').width),

  },

  textItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    flexWrap: 'wrap',
    width: 100
  },

  imageItem: {
    flex: 2,
    height: 200,
    alignSelf: 'stretch',


  }

});



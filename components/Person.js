import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {isFavorite} from '../api/database'
import colors from '../theme/Colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Person extends Component {
  state = {
    favorite: false,
  }

  componentDidMount() {
    isFavorite(this.state.url).then((fav) =>{
      this.setState({
        favorite: fav
      });
    })
  }

  render() {
    const { datos: { name, gender, birth_year, url }, onLike } = this.props
    this.state.url = url;
    
    return (
      <View style={{flexDirection:"row"}}>
        <View style={styles.container}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{gender.slice(0,1).toUpperCase() + gender.slice(1, gender.length) + " | Birth date: " + birth_year}</Text>
        </View>
        {(this.state.favorite)?
          <MaterialIcons
                name="star"
                style={{ marginRight: 10, color: '#ffff00',textAlign: 'right' , flex:1, paddingTop:16}}
                size={24}
              />
          : null}
      </View>
    )
  }
}

const styles = new StyleSheet.create({
  container : {
    padding: 8,
    paddingStart: 16,
    flex:1
  },
  title : {
    fontWeight: "600",
    fontSize: 16,
    color: colors.fontColor
  },
  subtitle : {
    color: colors.fontColor,
    opacity: 0.6,
    fontSize: 14,
  }
})
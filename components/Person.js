import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native'
//import { Ionicons } from '@expo/vector-icons'
//import { ListItem } from 'react-native-elements'
import {isFavorite} from '../api/database'
import colors from '../theme/Colors'

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
    //const nombreIconoCorazon = `${Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}${favorite ? '' : '-outline'}`
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{gender.slice(0,1).toUpperCase() + gender.slice(1, gender.length) + " | Birth date: " + birth_year}</Text>
        {(this.state.favorite)?
          <Text style={styles.title}>FAV</Text>
        : null}
        
      </View>
      /*
      <ListItem
        key={url}
        //leftAvatar={{ source: { uri: l.avatar_url } }}
        title={name}
        subtitle={gender.slice(0,1).toUpperCase() + gender.slice(1, gender.length) + " | Birth date: " + birth_year}
        bottomDivider
        chevron
        style={{
          backgroundColor: colors.backgroundColor,
          paddingLeft: 4,
          paddingTop: 6,
          paddingBottom: 6,
          fontFamily: 'System',
        }}
      />
      */
    )
  }
}

const styles = new StyleSheet.create({
  container : {
    padding: 8,
    paddingStart: 16
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
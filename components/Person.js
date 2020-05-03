import React, { Component, PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { isFavorite } from '../api/database'
import colors from '../theme/Colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { EventRegister } from 'react-native-event-listeners'

export default class Person extends PureComponent {
  state = {
    favorite: false,
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('refreshFav', (url) => {
      if (url == this.state.url) {
        isFavorite(this.state.url).then((fav) => {
          this.setState({
            favorite: fav
          });
        })
      }
    })
    isFavorite(this.state.url).then((fav) => {
      this.setState({
        favorite: fav
      });
    })
  }

  render() {
    const { datos: { name, gender, birth_year, url }, onLike } = this.props
    this.state.url = url;

    return (
      <View style={{ flexDirection: "row" }}>
        <View style={styles.container}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{gender.slice(0, 1).toUpperCase() + gender.slice(1, gender.length) + " | Birth date: " + birth_year}</Text>
        </View>
        {(this.state.favorite) ?
          <MaterialIcons
            name="star"
            style={{ marginRight: 16, color: '#ffff00', textAlign: 'right', flex: 1, paddingTop: 16, width: 20 }}
            size={18}
          />
          : null}
      </View>
    )
  }
}

const styles = new StyleSheet.create({
  container: {
    padding: 8,
    paddingStart: 16,
    flex: 5
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: colors.fontColor
  },
  subtitle: {
    color: colors.fontColor,
    opacity: 0.6,
    fontSize: 14,
  }
})
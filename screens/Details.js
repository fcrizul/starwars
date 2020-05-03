import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView,ActivityIndicator } from 'react-native'
import colors from '../theme/Colors';
import { getPerson} from '../api/swapi'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isFavorite, addFavorite, delFavorite} from '../api/database'
import { EventRegister } from 'react-native-event-listeners'

export default class DetailsScreen extends React.Component {
  state = {
    loading: true,
    favorite: false,

    name:null,
    height: null,
    mass: null,
    hair_color: null,
    skin_color: null,
    eye_color: null,
    birth_year: null,
    gender: null,
    amount_films: null,
  }

  row = (title, subtitle) => {
    return(
      <View style={styles.row}>
        <Text style={styles.row_title}>{title}</Text>
        <Text style={styles.row_subtitle}>{subtitle}</Text>
      </View>
    )
  }

  componentDidMount() {
    getPerson(this.props.navigation.state.params.url).then(response => 
      this.setState({ 
      height :  response.height,
      name: response.name,
      mass: response.mass,
      hair_color: response.hair_color,
      skin_color: response.skin_color,
      eye_color: response.eye_color,
      birth_year: response.birth_year,
      gender: response.gender,
      amount_films: response.films,
    
      loading: false,
    }))

    isFavorite(this.props.navigation.state.params.url).then((fav) =>{
      this.setState({
        favorite: (fav == true)
      });
    })
  }

  addFav = () => {
    addFavorite(this.props.navigation.state.params.url).then((add) =>{
      if (add){
        this.setState({
          favorite: true
        });
        EventRegister.emit('refreshFav', this.props.navigation.state.params.url)
      }
    })
  }

  delFav = () => {
    delFavorite(this.props.navigation.state.params.url).then((del) =>{
      if (del){
        this.setState({
          favorite: false
        });
        EventRegister.emit('refreshFav', this.props.navigation.state.params.url)
      }
    })
  }

  render() {
    const { name, height,mass,hair_color,skin_color,eye_color,birth_year,gender,amount_films} = this.state

    return (
      <View style={styles.container}>
      {this.state.loading ? (
          <ActivityIndicator style={styles.loading} size="large" color={colors.fontColor}/>
        ) : (
      <ScrollView>
        <View >
          <View style={{flexDirection:"row",paddingLeft:16, paddingTop:16}}>
            {(this.state.favorite)?(
              <MaterialIcons
                name="star"
                onPress={this.delFav}
                style={{ marginRight: 10, color: '#ffff00' }}
                size={24}
              />
            ):(
              <MaterialIcons
                name="star-border"
                onPress={this.addFav}
                style={{ marginRight: 10, color: 'white' }}
                size={24}
              />
              
            )}
            
            <Text style={styles.title}>{name}</Text>
          </View>
          {this.row("Gender",gender)}
          {this.row("Birth date",birth_year)}
          {this.row("Amount of films",amount_films.length)}
          {this.row("Height",height)}
          {this.row("Mass",mass)}
          {this.row("Eyes",eye_color)}

        </View>
      
      </ScrollView>
      )}
      </View>
    );
        }
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: colors.backgroundColor
  },
  title: {
    fontSize: 20,
    paddingBottom: 4,
    paddingLeft: 16,
  },
  row: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  row_title: {
    color: colors.fontColor,
    fontSize: 12,
    opacity: 0.7,
    paddingBottom: 4,
  },
  row_subtitle: {
    color: colors.fontColor,
    fontSize: 16
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
import React from 'react'
import { FlatList, StyleSheet, Text, NativeModules, View, ActivityIndicator, TouchableHighlight } from 'react-native'
import Person from '../components/Person'
import { getPeople } from '../api/swapi'
import colors from '../theme/Colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu, { MenuItem } from 'react-native-material-menu';
import auth from '@react-native-firebase/auth';

const UIManager = NativeModules.UIManager;

export default class PeopleScreen extends React.Component {
  state = {
    people: [],
    loading: true,
    fetching_from_server: false,
    filter_all: true,
    update: false,
  }

  componentDidMount() {
    this.props.navigation.setParams({ 
      setMenuRef: this.setMenuRef,
      hideMenu: this.hideMenu,
      showMenu: this.showMenu,
      logout: this.logout,
      filterAll: this.filterAll,
      filterFav: this.filterFav
    })

    getPeople().then(response => this.setState({
      people: response.results,
      next: response.next,
      loading: false,
    }))
  }

  filterAll = async () => {
    this._menu.hide();
    this.state.next = "null"
    if (!this.state.fetching_from_server && this.state.next != null && !this.state.loading) {
      this.setState({
        fetching_from_server: true
      });

      let response = await getPeople(false)
      this.state.next = response.next,
        this.setState({
          people: response.results,
          fetching_from_server: false,
          filter_all: true
        })
    }
  }

  filterFav = async () => {
    this._menu.hide();
    this.state.next = "null"
    if (!this.state.fetching_from_server && this.state.next != null && !this.state.loading) {
      this.setState({
        fetching_from_server: true
      });

      let response = await getPeople(true)
      this.state.next = response.next,
        this.setState({
          people: response.results,
          fetching_from_server: false,
          filter_all: false
        })
    }
  }

  handleOnPress = (url) => {
    this.props.navigation.navigate('Details', {
      url: url,
    });
  }

  renderItem = ({ item }) => <TouchableHighlight onPress={() => this.handleOnPress(item.url)}><Person datos={item} /></TouchableHighlight>

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  logout = () => {
    auth().signOut().then(() =>
      this.props.navigation.replace('Login')
    );
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerRight: () => (
        <View style={{ marginRight: 10, flexDirection: "row" }}>
          <Menu
            ref={params.setMenuRef}
            button={<MaterialIcons
              name="filter-list"
              onPress={params.showMenu}
              style={{ marginRight: 8, color: 'white' }}
              size={24}
            />}
          >
            <MenuItem onPress={params.filterAll}><Text style={{ color: colors.backgroundColor }}>All</Text></MenuItem>
            <MenuItem onPress={params.filterFav}><Text style={{ color: colors.backgroundColor }}>Favorites</Text></MenuItem>
          </Menu>
          <MaterialIcons
            name="exit-to-app"
            onPress={params.logout}
            style={{ marginRight: 4, color: 'white', marginLeft: 8 }}
            size={24}
          />
        </View>
      ),
    };
  };

  render() {
    const { people } = this.state
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator style={styles.loading} size="large" color={colors.fontColor} />
        ) : (
            <FlatList
              keyExtractor={item => item.url}
              data={people}
              renderItem={this.renderItem}
              onEndReached={this.loadMoreData}
              onEndThreshold={0.5}
              ListFooterComponent={this.listFooter}
              refreshing={this.state.fetching_from_server}
              //extraData={this.state}
              ItemSeparatorComponent={this.separator}
              ListHeaderComponent={this.listHeader}
            />
          )}
      </View>
    );
  }

  loadMoreData = async () => {
    if (!this.state.fetching_from_server && this.state.next != null && !this.state.loading) {
      this.setState({
        fetching_from_server: true
      });

      let response = await getPeople(!this.state.filter_all, this.state.next)
      this.state.next = response.next,
        this.setState({
          people: [...this.state.people, ...response.results],
          fetching_from_server: false
        })
    }
  }

  listFooter = () => {
    if (this.state.fetching_from_server) {
      return (
        <ActivityIndicator style={styles.footer} size="large" color={colors.fontColor} />
      )
    }
    else {
      return null;
    }
  }
  listHeader = () => {
    if (!this.state.filter_all) {
      return (
        <Text style={styles.text_header}>Favorites</Text>
      )
    }
    else {
      return null;
    }
  }
  separator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          opacity: 0.3,
        }}
      />
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: colors.backgroundColor,
  },
  footer: {
    padding: 8,
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
  text_header: {
    color: "#ECEFF1",
    opacity: 0.6,
    fontSize: 16,
    padding: 16,
    fontWeight: "700",
  }
})
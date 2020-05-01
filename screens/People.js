import React from 'react'
import { Image, findNodeHandle , FlatList, StyleSheet, Text, NativeModules, View,ActivityIndicator,TouchableHighlight,Button  } from 'react-native'
import Person from '../components/Person'
import { getPeople } from '../api/swapi'
import colors from '../theme/Colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

const UIManager = NativeModules.UIManager;

export default class PeopleScreen extends React.Component {
  state = {
    people: [],
    loading: true,
    fetching_from_server: false,
    filter_all: true
  }

  componentDidMount() {
    this.props.navigation.setParams({ setMenuRef: this.setMenuRef })
    this.props.navigation.setParams({ hideMenu: this.hideMenu })
    this.props.navigation.setParams({ showMenu: this.showMenu })
    this.props.navigation.setParams({ filterAll: this.filterAll })
    this.props.navigation.setParams({ filterFav: this.filterFav })

    this.props.navigation.setParams({ getFilterIsAll: this.getFilterIsAll })
    getPeople().then(response => this.setState({ 
      people :  response.results,
      next: response.next,
      loading: false,
    }))
  }

  filterAll = () => {
    this.setState({
      filter_all: true
    });
    this._menu.hide();
  }

  filterFav = () => {
    this.setState({
      filter_all: false
    });
    this._menu.hide();
  }

  handleOnPress = (url) => {
    alert("clicked")
  }

  renderItem = ({ item }) => <TouchableHighlight  onPress={() => this.handleOnPress(item.url)}><Person datos={item} /></TouchableHighlight>

  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerRight: () => (
        <View  style={{marginRight:10}}>
          <Menu
              ref={params.setMenuRef}
              button={<MaterialIcons
                name="filter-list"
                onPress={params.showMenu}
                style={{ marginRight: 10, color: 'white' }}
                size={24}
              />}
          >
            <MenuItem onPress={params.filterAll}>All</MenuItem>
            <MenuItem onPress={params.filterFav}>Favorites</MenuItem> 
          </Menu>
        </View>
      ),
    };
  };

  render() {
    const { people } = this.state
    return (
      <View style={styles.container}>
      {this.state.loading ? (
        <ActivityIndicator style={styles.loading} size="large" color={colors.fontColor}/>
      ) : (
        <FlatList 
            keyExtractor={item => item.url}
            data={people} 
            renderItem={this.renderItem} 
            onEndReached={this.loadMoreData}
            onEndThreshold={0.5}
            ListFooterComponent={this.listFooter}
            refreshing={this.state.fetching_from_server}
            ListHeaderComponent={this.listHeader}
          />
          )}
      </View>
    );
  }

  loadMoreData = async () => {
    if (!this.state.fetching_from_server && this.state.next != null && !this.state.loading){
      this.setState({
        fetching_from_server: true
      });
      
      let response = await getPeople(this.state.next)
      this.state.next = response.next,
      this.setState({ 
        people : [...this.state.people, ...response.results] ,
        fetching_from_server: false
      })
    }
  }

  listFooter = ()=> {
    if (this.state.fetching_from_server) {
      return (
        <ActivityIndicator style={styles.footer} size="large" color={colors.fontColor}/>
      )
    }
    else {
      return null;
    }
  }
  listHeader = ()=> {
    if (!this.state.filter_all) {
      return (
        <Text style={styles.text_header}>Favoritos</Text>
      )
    }
    else {
      return null;
    }
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
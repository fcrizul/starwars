import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const getFavorites = async () => {
    const user = auth().currentUser;
    if (user != null){
        console.log(user.uid)
        database()
        .ref('/users/' + user.uid)
        .once('value')
        .then(snapshot => {
            console.log('User data: ', snapshot.val());
        });
    }    
}

export const setFavorite = (id) => {
    const user = auth().currentUser;
    var json = { };
    json[id] = true;
    if (user != null){
        database()
        .ref('/users/' + user.uid)
        .update(json)
          .then(() => console.log('Data set.'));
    }    
}

export const delFavorite = (id) => {
    const user = auth().currentUser;
    var json = { };
    json[id] = true;
    if (user != null){
        database()
        .ref('/users/' + user.uid + "/" + id)
        .remove();
    }    
}

export const isFavorite = async (id) =>{
    console.log("run isFav")
    const user = auth().currentUser;
    try {
        if (user != null){
            var db_fav = await database().ref('/users/' + user.uid + "/" + id);
            var fav = false
            return db_fav.once("value", snapshot => {
                console.log("Is favoritess: " + snapshot.val())
                return snapshot.val();
            })
        }  
    }catch(err){
        return false
    }  
}
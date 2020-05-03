import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const getFavorites = async () => {
    const user = auth().currentUser;
    if (user != null) {
        var db = await database().ref('/users/' + user.uid + "/fav")
        var fav = []
        var get = await db.once("value", (snapshot) => {
            var tmp = snapshot.val()
            if (tmp != null)
                fav = Object.keys(tmp)
        })
        return fav
    }
}

export const addFavorite = async (url) => {
    let regexp = url.match(".*people/(.+?)/");
    var id = regexp[1];

    const user = auth().currentUser;
    var json = {};
    json[id] = true;
    if (user != null) {
        var db_fav = await database().ref('/users/' + user.uid + "/fav")
        var val = false
        var add = await db_fav.update(json, error => {
            val = (error == null)
        })
        return val
    }
    return false
}

export const delFavorite = async (url) => {
    let regexp = url.match(".*people/(.+?)/");
    var id = regexp[1];

    const user = auth().currentUser;
    if (user != null) {
        var db_fav = await database().ref('/users/' + user.uid + "/fav/" + id)
        var val = false
        var del = await db_fav.remove(error => {
            val = (error == null)
        })
        return val
    }
    return false
}

export const isFavorite = async (url) => {
    let regexp = url.match(".*people/(.+?)/");
    var id = regexp[1];

    const user = auth().currentUser;
    try {
        if (user != null) {
            var db_fav = await database().ref('/users/' + user.uid + "/fav/" + id);
            var val = false
            var fav = await db_fav.once("value", (snapshot) => {
                val = snapshot.val()
                if (val == null)
                    val = false
            })
            return val
        }
    } catch (err) {
        return false
    }
}
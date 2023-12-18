import React, {useCallback, useEffect, useState} from 'react';
import {IUser} from '../../types/User';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {IAlbum, IAlbums} from '../../types/Album';
import {USER_ALBUMS_API_URL} from '../../helpers/constants';
import UserAlbumListItem from '../UserAlbumListItem';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  userName: {
    fontSize: 19,
    color: 'white',
  },
  userNameContainer: {
    backgroundColor: '#32612E',
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
});

interface Props {
  user: IUser;
}

const DashboardListItem = ({user = {} as IUser}: Props) => {
  /** HOOKS ************************************************** */
  /** STATE ************************************************** */
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([] as IAlbums);
  /** USECALLBACK ******************************************** */
  const getData = useCallback(async () => {
    if (user?.id) {
      try {
        setLoading(true);
        const response = await fetch(USER_ALBUMS_API_URL + user?.id)
          .then(r => r.json())
          .then(r => r);
        setAlbums(response);
      } catch (e: any) {
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  }, [user?.id]);
  /** HANDLERS & FUNCTIONS *********************************** */
  const handleDeleteAlbumPress = (value: IAlbum) => {
    let albumsTmp = albums?.map(i => i);
    albumsTmp = albumsTmp?.filter(al => al.id !== value?.id);
    setAlbums(albumsTmp);
  };

  const renderItem = ({item}) => {
    return (
      <UserAlbumListItem onDeletePress={handleDeleteAlbumPress} album={item} />
    );
  };
  /** EFFECTS ************************************************ */
  useEffect(() => {
    getData();
  }, [getData]);
  /** TEMPLATE(RENDER) *************************************** */

  return (
    <View style={styles.root}>
      <View style={styles.userNameContainer}>
        <Text style={styles.userName}>{user?.name || 'username'}</Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={albums}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item?.id?.toString() || `key-${index?.toString()}`
          }
        />
      )}
    </View>
  );
};

export default DashboardListItem;

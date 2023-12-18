import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IAlbum} from '../../types/Album';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D2D2D2',
  },
  rowSpacedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteFakeIconContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#FFF3F1',
  },
  deleteFakeIcon: {
    fontWeight: '700',
    color: 'red',
    fontSize: 16,
  },
});

interface Props {
  album: IAlbum;
  onDeletePress: (item: IAlbum) => void;
}

const UserAlbumListItem = ({album = {} as IAlbum, onDeletePress}: Props) => {
  /** HOOKS ************************************************** */
  const navigation = useNavigation() as any;
  /** STATE ************************************************** */
  /** USECALLBACK ******************************************** */
  /** HANDLERS & FUNCTIONS *********************************** */
  const handleTitlePress = () => {
    navigation.navigate('ItemDetail', {album});
  };
  /** EFFECTS ************************************************ */
  /** TEMPLATE(RENDER) *************************************** */

  return (
    <View style={styles.root}>
      <View style={styles.rowSpacedContainer}>
        <TouchableOpacity onPress={handleTitlePress}>
          <Text>{album?.title || 'albumname'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteFakeIconContainer}
          onPress={() => onDeletePress(album)}>
          <Text style={styles.deleteFakeIcon}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserAlbumListItem;

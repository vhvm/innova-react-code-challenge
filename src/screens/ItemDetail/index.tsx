import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/Navigation';
import {IAlbumPhotos} from '../../types/Album';
import {ALBUM_PHOTOS, ALL_PHOTOS_API_URL} from '../../helpers/constants';

const styles = StyleSheet.create({
  flex1: {flex: 1},
  actionText: {color: '#2298F0', fontSize: 17, fontWeight: '500'},
});

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

const ItemDetail: React.FC<Props> = ({navigation, route}: any) => {
  /** HOOKS ************************************************** */
  /** STATE ************************************************** */
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([] as IAlbumPhotos);
  const [isAllActive, setIsAllActive] = useState(false);

  /** USECALLBACK ******************************************** */
  const getData = useCallback(async () => {
    if (route?.params?.album?.id) {
      try {
        setLoading(true);
        const response = await fetch(
          isAllActive
            ? ALL_PHOTOS_API_URL
            : ALBUM_PHOTOS + route?.params?.album?.id,
        )
          .then(r => r.json())
          .then(r => r);
        setPhotos(response);
      } catch (e: any) {
      } finally {
        setLoading(false);
      }
    }
  }, [route?.params?.album, isAllActive]);
  /** HANDLERS & FUNCTIONS *********************************** */
  const handleActionPress = () => {
    setIsAllActive(!isAllActive);
  };
  const renderItem = ({item}) => {
    return <Image source={{uri: item.url, height: 100}} style={styles.flex1} />;
  };
  const renderHeaderRightAction = () => {
    return (
      <TouchableOpacity onPress={handleActionPress}>
        <Text style={styles.actionText}>
          {isAllActive ? 'Album photos' : 'Show all'}
        </Text>
      </TouchableOpacity>
    );
  };
  /** EFFECTS ************************************************ */
  useEffect(() => {
    navigation.setOptions({
      title:
        (isAllActive ? 'All photos' : route?.params?.album?.title) || 'Photos',
      headerRight: () => renderHeaderRightAction(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, route, isAllActive]);
  useEffect(() => {
    getData();
  }, [getData]);
  /** TEMPLATE(RENDER) *************************************** */
  return (
    <View>
      {loading ? <ActivityIndicator /> : <></>}
      <FlatList
        numColumns={3}
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item?.id?.toString() || `key-${index?.toString()}`
        }
      />
    </View>
  );
};

export default ItemDetail;

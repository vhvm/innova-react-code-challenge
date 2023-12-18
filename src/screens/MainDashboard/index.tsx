import React, {useCallback, useEffect, useState} from 'react';
import {View, Button, FlatList, ActivityIndicator} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/Navigation';
import {IUser, IUsers} from '../../types/User';
import {USERS_API_URL} from '../../helpers/constants';
import DashboardListItem from '../../components/DashboardListItem';
import {IAlbum} from '../../types/Album';

type Props = NativeStackScreenProps<RootStackParamList, 'MainDashboard'>;

const MainDashboard: React.FC<Props> = ({navigation}) => {
  /** HOOKS ************************************************** */
  /** STATE ************************************************** */
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([] as IUsers);

  /** USECALLBACK ******************************************** */
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(USERS_API_URL)
        .then(r => r.json())
        .then(r => r);
      setUsers(response);
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  }, []);

  /** HANDLERS & FUNCTIONS *********************************** */
  const renderItem = ({item}) => {
    return <DashboardListItem user={item} />;
  };
  /** EFFECTS ************************************************ */
  useEffect(() => {
    getData();
  }, [getData]);
  /** TEMPLATE(RENDER) *************************************** */
  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            collapsable
            data={users}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item?.id?.toString() || `key-${index?.toString()}`
            }
          />
          <Button
            title="Go to Other Screen"
            onPress={() => navigation.navigate('ItemDetail')}
          />
        </>
      )}
    </View>
  );
};

export default MainDashboard;

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListCategory,
  moveToTop,
  setOpenList,
  setRefreshing,
  getListDetailCategory,
} from '../redux/list/listSlice';
import {AppDispatch} from './../redux/store';
import {colorApp, stylesheets} from '../assets';
import CustomHeader from '../components/header';
import Gap from '../components/gap';
const HomeScreen = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    listCategory,
    openList,
    isLoading,
    refreshing,
    listDetailCategory,
    isLoadingDetail,
    isError,
  } = useSelector((state: any) => state.list);
  React.useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch]);
  const moveToTopAction = (index: number) => {
    dispatch(moveToTop(index));
  };
  const openListItem = (item: string, index: number) => {
    if (openList !== item) {
      listDetailCategory[index].length == 0 && fetchDataDetail(index);
      dispatch(setOpenList(item));
    } else {
      dispatch(setOpenList(''));
    }
  };
  const fetchDataDetail = async (index: number) => {
    dispatch(
      getListDetailCategory({
        category: listCategory[index],
        count: 2,
        index: index,
      }),
    );
  };
  const fetchDataDetailLoadMore = async (
    index: number,
    count: number,
    category: string,
  ) => {
    dispatch(
      getListDetailCategory({
        category: category,
        count: count + 2,
        index: index,
      }),
    );
  };
  const AlretPopUp = (desc: string) =>
    Alert.alert('Detail List', desc, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  const onRefresh = () => {
    dispatch(setRefreshing(true));
    dispatch(getListCategory());
    dispatch(setOpenList(''));
    dispatch(setRefreshing(false));
  };
  const renderItem = ({item, index}: {item: string; index: number}) => (
    <TouchableOpacity
      onPress={() => openListItem(item, index)}
      style={styles.card}>
      <View style={stylesheets.row}>
        <Text style={stylesheets.title(colorApp.black as string)}>
          {index + 1}.
        </Text>
        <Text style={[stylesheets.title(colorApp.black as string), {flex: 1}]}>
          {item}
        </Text>
        {index !== 0 ? (
          <TouchableOpacity onPress={() => moveToTopAction(index)}>
            <Text>⬆️</Text>
          </TouchableOpacity>
        ) : (
          <Text style={stylesheets.title(colorApp.black as string, 12)}>
            TOP
          </Text>
        )}
      </View>
      {openList === item && (
        <View>
          <View style={styles.line} />
          {listDetailCategory[index].length > 0 ? (
            <FlatList
              data={listDetailCategory[index] ?? []}
              renderItem={renderItemDetail}
              keyExtractor={indexDetail => indexDetail.toString()}
              ListFooterComponent={() =>
                isLoadingDetail && (
                  <View
                    style={[
                      stylesheets.contentCenterNoBackground,
                      {paddingVertical: 10},
                    ]}>
                    <ActivityIndicator
                      size={'small'}
                      color={colorApp.primary as string}
                    />
                  </View>
                )
              }
            />
          ) : (
            <View
              style={[
                stylesheets.contentCenterNoBackground,
                {paddingVertical: 10},
              ]}>
              {isError ? (
                <Text>Data Gagal Dimuat!</Text>
              ) : (
                <ActivityIndicator
                  size={'small'}
                  color={colorApp.primary as string}
                />
              )}
            </View>
          )}
          {listDetailCategory[index].length !== 6 &&
            listDetailCategory[index].length > 0 && (
              <TouchableOpacity
                onPressIn={() =>
                  fetchDataDetailLoadMore(
                    index,
                    listDetailCategory[index].length,
                    item,
                  )
                }
                style={[
                  stylesheets.contentCenterNoBackground,
                  {
                    backgroundColor: colorApp.primary as string,
                    paddingVertical: 5,
                    borderRadius: 10,
                    marginTop: 20,
                  },
                ]}
                onPress={() => {}}>
                <Text
                  style={stylesheets.titleBold(colorApp.white as string, 12)}>
                  Load More
                </Text>
              </TouchableOpacity>
            )}
        </View>
      )}
    </TouchableOpacity>
  );

  const renderItemDetail = ({item, index}: {item: string; index: number}) => (
    <TouchableOpacity
      onPress={() => AlretPopUp(item)}
      style={[stylesheets.row, {marginBottom: 5}]}>
      <Text>•</Text>
      <Gap width={5} />
      <Text key={index} style={stylesheets.title(colorApp.black as string)}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={stylesheets.container(colorApp.white as string)}>
      <CustomHeader title="My Aplication" />
      <Gap height={20} />
      {isLoading ? (
        <View style={stylesheets.contentCenterNoBackground}>
          <ActivityIndicator
            size={'large'}
            color={colorApp.primary as string}
          />
        </View>
      ) : (
        <FlatList
          data={listCategory}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colorApp.primary as string]}
            />
          }
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colorApp.white as string,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  line: {
    flex: 1,
    height: 1,
    marginVertical: 10,
    backgroundColor: colorApp.blackBlur as string,
  },
});

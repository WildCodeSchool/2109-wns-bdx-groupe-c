import React from 'react';
import { View, StyleSheet  } from 'react-native';

import VARIABLES from '../../assets/styles/_variables';

import UserDashboardCardTaskFrst from '../components/organisms/UserDashboardCardTaskFrst';
import UserDashboardCardTaskScnd from '../components/organisms/UserDashboardCardTaskScnd';
import UserDashboardCardProject from '../components/organisms/UserDashboardCardProject';

export default function UserDashboard () {

  const styles = StyleSheet.create({
    homeContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: VARIABLES.clrBgDark,
    },
  });

  return (
    <View style={styles.homeContainer}>
      {/* <UserDashboardCardTaskFrst></UserDashboardCardTaskFrst>
      <UserDashboardCardTaskScnd></UserDashboardCardTaskScnd>
      <UserDashboardCardProject></UserDashboardCardProject> */}
    </View>
  );
}
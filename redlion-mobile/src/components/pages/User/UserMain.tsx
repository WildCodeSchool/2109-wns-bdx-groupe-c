import React from 'react';
import { View, StyleSheet  } from 'react-native';

import VARIABLES from '../../../../assets/styles/_variables';

import UserDashboardCardTaskFrst from '../../organisms/User/UserDashboardCardTaskFrst';
import UserDashboardCardTaskScnd from '../../organisms/User/UserDashboardCardTaskScnd';
import UserDashboardCardProject from '../../organisms/User/UserDashboardCardProject';

export default function UserMain () {

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
      <UserDashboardCardTaskFrst></UserDashboardCardTaskFrst>
      <UserDashboardCardTaskScnd></UserDashboardCardTaskScnd>
      <UserDashboardCardProject></UserDashboardCardProject> 
    </View>
  );
}
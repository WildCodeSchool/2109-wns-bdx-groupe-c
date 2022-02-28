import { StyleSheet } from "react-native";

import VARIABLES from "./_variables";

const ProjectDashboardCardStyle = StyleSheet.create({
    projectCard: {
      width: VARIABLES.windowWidth - 20,
      marginVertical: 10,
      backgroundColor: VARIABLES.clrShdwThrd,
      borderRadius: 18,
      shadowColor: VARIABLES.clrBlack,
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 60,
    },
    projectCardTopColor: {
      backgroundColor: '#1AE46B',
      height: 15,
      width: '70%',
      borderTopLeftRadius: 18,
      borderBottomRightRadius: 18,
    },
    projectCardTop: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    projectCardName: {
      paddingHorizontal: 10,
      color: VARIABLES.clrWhite,
      fontWeight: 'bold',
    },
    projectCardBody: {
     paddingBottom: 5,
     paddingHorizontal: 10,
    },
    projectCardDescription: {
      marginVertical: 5,
      color: VARIABLES.clrWhite,
    },
    projectCardLanguages: {
      paddingVertical: 5,
      color: VARIABLES.clrWhite,
    },
    projectCardBottom: {
      paddingVertical: 5,
      marginHorizontal: 10,
    },
    projectCardProgress: {
      color: VARIABLES.clrWhite,
    },
    projectCardProgressBar: {
      height: 6,
      width: '100%',
      marginVertical: 5,
      backgroundColor: 'white',
      borderColor: 'transparent',
      borderRadius: 8
    },
  });

export default ProjectDashboardCardStyle;
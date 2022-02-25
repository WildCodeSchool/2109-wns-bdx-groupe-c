/* all variables for the React-Native App part */

import { Dimensions } from 'react-native';

const VARIABLES = {

    /* ---------------------- */
    /* ----- window's sizes ----- */
    
    windowWidth: Dimensions.get('window').width,
    
    /* ----- window's sizes ----- */
    /* ---------------------- */
    
    /* ---------------------- */
    /* ----- colors ----- */
    
    // basics
    clrWhite: '#fff',
    clrBlack: '#000',
    clrBgDark: '#061B2E',
    clrFrst: '#061B2E',
    clrScnd: '#0F4473',
    clrThrd : '#1F84E1',
    
    // colors / opacity  === clrScnd + opacity
    clrShdwFrst: 'rgba(15, 68, 115, .7)',
    clrShdwScnd: 'rgba(15, 68, 115, .5)',
    clrShdwThrd: 'rgba(15, 68, 115, .3)',
    clrShdwFrth: 'rgba(15, 68, 115, .1)',
    
    // actions colors
    clrValidate: '#1F84E1',
    clrCancel: '#EC2424',
    
    // tags colors
    clrTag1: '#1AE46B',
    clrTag2: '#A5A6F6',
    clrTag3: '#E9FF63',
    clrTag4: '#10CEC3',
    
    /* ----- colors ----- */
    /* ---------------------- */
    
    /* ---------------------- */
    /* ----- shadows ----- */
};

export default VARIABLES;
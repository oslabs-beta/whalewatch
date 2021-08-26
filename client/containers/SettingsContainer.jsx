import React from "react";
import { useState } from 'react';
import { withAuth } from "../withAuth";
import NavBar from "../components/NavBar/NavBar";

import {View, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../assets/theme/colors';
import AppModal from '../common/AppModal';
import Icon from '../common/Icon';

// const SettingsContainer = ({
//   modalVisible,
//   setModalVisible,
//   settingsOptions,
//   prefArr,
// }) => {
//   return (
//     <>
//       <AppModal
//         modalVisible={modalVisible}
//         modalFooter={<></>}
//         closeOnTouchOutside={false}
//         modalBody={
//           <View>
//             {prefArr.map(({name, selected, onPress}) => (
//               <View key={name}>
//                 <TouchableOpacity
//                   onPress={onPress}
//                   style={{
//                     flexDirection: 'row',
//                     paddingVertical: 5,
//                     alignItems: 'center',
//                   }}>
//                   {selected && <Icon size={17} name="check" type="material" />}
//                   <Text style={{fontSize: 17, paddingLeft: selected ? 15 : 30}}>
//                     {name}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View>
//         }
//         title="Sort by"
//         setModalVisible={setModalVisible}
//       />
//       <ScrollView style={{backgroundColor: colors.white}}>
//         {settingsOptions.map(({title, subTitle, onPress}, index) => (
//           <TouchableOpacity key={title} onPress={onPress}>
//             <View
//               style={{
//                 paddingHorizontal: 20,
//                 paddingBottom: 20,
//                 paddingTop: 20,
//               }}>
//               <Text style={{fontSize: 17}}>{title}</Text>
//               {subTitle && (
//                 <Text style={{fontSize: 14, opacity: 0.5, paddingTop: 5}}>
//                   {subTitle}
//                 </Text>
//               )}
//             </View>

//             <View style={{height: 0.5, backgroundColor: colors.grey}} />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </>
//   );
// };


// const SettingsContainer = (props) => {
//   const [settingsList, setSettingsList] = useState([]);
//   return (
//     <div className='dashbaordContainer'>
//       <NavBar />
//       <div className='whaleChartContainer'>
//         <p> This is the {settingsList} right here</p>
//         <p> Save</p>
//         <p> This is the {settingsList} right here</p>
//         <p> This is the {settingsList} right here</p>
//         <p> This is the {settingsList} right here</p>

//         <button onClick={() => setSettingsList(settingsList + ' hello')}>
//           Click me
//         </button>
//       </div>

//     </div>
//   )
// }

export default withAuth(SettingsContainer)
import { Train } from '@/types/types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { trainIconMap, UnknownTrainComponent } from './TrainIcons';
import { Default } from '@/constants/Fonts';

const TrainComponentMap = ({ trains }: { trains: Train[] }) => {
  if (trains.length === 0) {
    return (
      <View style={styles.noTrains}>
        <Text style={styles.noTrainsText}>No trains available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {trains.slice(0, 4).map((train, index) => {
        const TrainIcon = trainIconMap[train.route_id] || null;
        const isLastTrain = index === trains.length - 1 || index === 3;

        return (
          <View
            key={index}
            style={[styles.trainItem, !isLastTrain && styles.borderBottom]}
          >
            {TrainIcon && <TrainIcon scale={0.5} />}
            {!TrainIcon && (
              <UnknownTrainComponent routeId={train.route_id} scale={0.5} />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.destination}>{train.destination}</Text>
              <Text style={styles.arrivalTime}>{train.arrival_time}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trainItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 4,
  },
  destination: {
    fontSize: 12,
  },
  arrivalTime: {
    fontSize: 12,
  },
  noTrains: {
    padding: 4,
    alignItems: 'center',
  },
  noTrainsText: {
    fontSize: 14,
    fontFamily: Default.fontFamily,
  },
});

export default TrainComponentMap;

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { trainIconMap, UnknownTrainComponent } from './TrainIcons';
// import { Default } from '@/constants/Fonts';

// const TrainComponentMap = ({ trains }: { trains: Train[] }) => {
//   if (trains.length === 0) {
//     return (
//       <View style={styles.noTrains}>
//         <Text style={styles.noTrainsText}>No trains available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {trains.slice(0, 4).map((train, index) => {
//         const TrainIcon = trainIconMap[train.route_id] || null;
//         const isLastTrain = index === trains.length - 1 || index === 3;

//         return (
//           <View
//             key={index}
//             style={[styles.trainItem, !isLastTrain && styles.borderBottom]}
//           >
//             {TrainIcon && <TrainIcon scale={0.7} />}
//             {!TrainIcon && <UnknownTrainComponent routeId={train.route_id} />}
//             <View style={styles.textContainer}>
//               <Text style={styles.destination}>{train.destination}</Text>
//               <Text style={styles.arrivalTime}>{train.arrival_time}</Text>
//             </View>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   trainItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 4,
//   },
//   borderBottom: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#000000',
//   },
//   textContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingLeft: 8,
//   },
//   destination: {
//     fontSize: 14,
//   },
//   arrivalTime: {
//     fontSize: 14,
//   },
//   noTrains: {
//     padding: 8,
//     alignItems: 'center',
//   },
//   noTrainsText: {
//     fontSize: 16,
//     // fontWeight: 'bold',
//     fontFamily: Default.fontFamily,
//   },
// });

// export default TrainComponentMap;

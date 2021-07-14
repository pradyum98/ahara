import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import { theme } from '../theme/theme';

const wWidth = Dimensions.get('window').width;

const DateSelector = ({
  dates,
  loading,
  error,
  selectedDate,
  setSelectedDate,
}) => {
  const getDayNumber = (day) => {
    return moment(parseInt(day, 10)).format('DD');
  };

  const getDayName = (day) => {
    return moment(parseInt(day, 10)).format('ddd');
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {!dates || loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      ) : dates.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text>No available slots</Text>
        </View>
      ) : (
        dates.map((day, index) => (
          <Pressable
            key={index}
            style={[
              styles.dateItem,
              selectedDate === day && styles.selectedDateItem,
            ]}
            onPress={() => setSelectedDate(day)}
          >
            <Text
              style={[
                theme.typography.emphasis,
                styles.blackText,
                selectedDate === day && styles.whiteText,
              ]}
            >
              {getDayNumber(day)}
            </Text>
            <Text
              style={[
                theme.typography.smallText,
                styles.blackText,
                selectedDate === day && styles.whiteText,
              ]}
            >
              {getDayName(day)}
            </Text>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  contentContainer: {
    padding: theme.spacing.small,
  },
  dateItem: {
    borderRadius: 12,
    padding: theme.spacing.tiny,
    marginRight: theme.spacing.small,
    width: 50,
    alignItems: 'center',
  },
  selectedDateItem: {
    backgroundColor: theme.colors.primary,
  },
  blackText: {
    color: theme.colors.dark,
  },
  whiteText: {
    color: theme.colors.white,
  },
  loadingContainer: {
    width: wWidth - 32,
    paddingVertical: theme.spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DateSelector;
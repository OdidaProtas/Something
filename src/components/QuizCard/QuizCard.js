import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { func, string, shape, bool, number } from "prop-types";
import styles from "./QuizCard.styles";
import { FlatList } from "react-native-gesture-handler";
import CustomOrder from "../Order/Order";

const QuizCard = ({
  data: { type, question, cards },
  num,
  onPress,
  cardsAmount,
}) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.95}
    >
      <View style={styles.labelContainer}>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>{`${num + 1}/${cardsAmount}`}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.mainText}>{question}</Text>
      </View>

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={(item, index) => {
            return (
              <View key={index} style={{ margin: 6 }}>
                <Image
                  style={{ height: 100, width: 100, borderRadius: 4 }}
                  source={{
                    uri: "https://www.glorioustreats.com/wp-content/uploads/2011/07/perfect-vanilla-cupcakes-square.jpg",
                  }}
                />
                <CustomOrder />
              </View>
            );
          }}
          data={cards.slice(0, 6)}
        />
      </View>

      {cards.map((card) => {
        return (
          <View></View>
          // <QuizOption
          //   key={card.question}
          //   reveal={() => {
          //     setRevealed(true);
          //   }}
          //   revealed={revealed}
          //   card={card}
          // />
        );
      })}
    </TouchableOpacity>
  );
};

QuizCard.propTypes = {
  onPress: func,
  data: shape({
    number: string,
    question: string,
    value: bool,
    revealed: bool,
    picked: bool,
  }),
  num: number,
  cardsAmount: number,
};

export default QuizCard;

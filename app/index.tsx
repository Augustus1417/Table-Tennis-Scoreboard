import { Text, View, StyleSheet, Pressable } from "react-native";
import { useState } from 'react'
import styles from './styles'

export default function Index() {
  const [score_1, setScore_1] = useState(0);
  const [score_2, setScore_2] = useState(0);
  const [scoreHistory, setscoreHistory] = useState([""]);

  const IncrementScore_1  = () => {
    setScore_1(setScore_1 => score_1 + 1);
    setscoreHistory(scoreHistory => [ ...scoreHistory, "score_1"]);
  }

  const IncrementScore_2  = () => {
    setScore_2(setScore_2 => score_2 + 1);
    setscoreHistory(scoreHistory => [ ...scoreHistory, "score_2"]);
  }

  const Reset = () => {
    setScore_1(0);
    setScore_2(0);
    setscoreHistory([""]);
  }

  const Undo = () => {
    const index = scoreHistory.length - 1;
    if (scoreHistory[index] == "score_1") {
      setScore_1(setScore_1 => score_1 - 1);
    } else if (scoreHistory[index] == "score_2") {
      setScore_2(setScore_2 => score_2 - 1);
    }
    setscoreHistory([...scoreHistory.slice(0, index)]);
  }

  return (
    <View style={styles.main_view}>

      <Pressable onPress={IncrementScore_1}>
        <Text style={styles.score_1}>{score_1}</Text>
      </Pressable>

      <View style= {styles.controls_view}>
        <Pressable onPress={Reset}>
          <Text style={styles.reset}>Reset</Text>
        </Pressable>

        <Pressable onPress={Undo}>
          <Text style={styles.reset}>Undo</Text>
        </Pressable>
      </View>

      <Pressable onPress={IncrementScore_2}>
        <Text style={styles.score_2}>{score_2}</Text>
      </Pressable>

    </View>
  );
}

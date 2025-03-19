import { Text, View, Pressable } from "react-native";
import { useState } from 'react'
import styles from './styles'

export default function Index() {
  const [scores, setScores] = useState({score_1: 0, score_2: 0});
  const [scoreHistory, setScoreHistory] = useState([""]);

  const IncrementScore = (player: keyof typeof scores) => { 
    setScores(currentScores => ({...currentScores, [player]: currentScores[player] + 1}));
    setScoreHistory(scores => [...scores, player])

  }
  const DecrementScore = (player: keyof typeof scores) => {
    setScores(currentScores => ({...currentScores, [player]: currentScores[player] - 1}));
  }

  const Reset = () => {
    setScores({score_1: 0, score_2: 0});
    setScoreHistory([""]);
  }

  const Undo = () => {
    const index = scoreHistory.length - 1;
    if (scoreHistory[index] == "score_1") {
      DecrementScore("score_1");
    } else if (scoreHistory[index] == "score_2") {
      DecrementScore("score_2");
    }
    setScoreHistory([...scoreHistory.slice(0, index)]);
  }

  return (
    <View style={styles.main_view}>

      <Pressable onPress={() => IncrementScore("score_1")}>
        <Text style={styles.score_1}>{scores["score_1"]}</Text>
      </Pressable>

      <View style= {styles.controls_view}>
        <Pressable onPress={Reset}>
          <Text style={styles.reset}>Reset</Text>
        </Pressable>

        <Pressable onPress={Undo}>
          <Text style={styles.reset}>Undo</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => IncrementScore("score_2")}>
        <Text style={styles.score_2}>{scores["score_2"]}</Text>
      </Pressable>

    </View>
  );
}

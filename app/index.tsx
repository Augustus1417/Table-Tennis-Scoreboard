import { Text, View, Pressable, Alert } from "react-native";
import { useState } from 'react'
import { StatusBar } from "expo-status-bar";
import styles from './styles'

export default function Index() {
  const [scores, setScores] = useState({score_1: 0, score_2: 0});
  const [scoreHistory, setScoreHistory] = useState([""]);
  const [standing, setStanding] = useState({score_1: 0, score_2: 0});

  const IncrementScore = (player: keyof typeof scores) => { 
    const newScores = {...scores, [player]: scores[player] + 1}
    setScoreHistory(scores => [...scores, player]);
    setScores(newScores);

    if (newScores.score_1 == 10 && newScores.score_2 == 10){
    } else if (newScores.score_1 == 11){
      setStanding(currentStanding => ({...currentStanding, score_1: currentStanding["score_1"] + 1}));
      Alert.alert('Player 1 Wins!')
      NewSet()
    } else if (newScores.score_2 == 11){
      setStanding(currentStanding => ({...currentStanding, score_2: currentStanding["score_2"] + 1}));
      Alert.alert('Player 2 Wins!')
      NewSet()
    }
  }

  const DecrementScore = (player: keyof typeof scores) => {
    setScores(currentScores => ({...currentScores, [player]: currentScores[player] - 1}));
  }

  const NewSet = () => {
    setScores({score_1: 0, score_2: 0});
    setScoreHistory([""]);
  }

  const Reset = () => {
    setScores({score_1: 0, score_2: 0});
    setStanding({score_1: 0, score_2: 0});
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
      <StatusBar hidden={true}></StatusBar>

      <Pressable onPress={() => IncrementScore("score_1")}>
        <Text style={styles.score_1}>{String(scores.score_1).padStart(2, "0")}</Text>
      </Pressable>

      <View style= {styles.controls_view}>
        <Text style={styles.standing}>{standing.score_1}-{standing.score_2}</Text>
        <Pressable onPress={Reset}>
          <Text style={styles.reset}>Reset</Text>
        </Pressable>

        <Pressable onPress={Undo}>
          <Text style={styles.reset}>Undo</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => IncrementScore("score_2")}>
        <Text style={styles.score_2}>{String(scores.score_2).padStart(2, "0")}</Text>
      </Pressable>

    </View>
  );
}

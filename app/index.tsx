import { Text, View, Pressable, Alert } from "react-native"
import { useState } from 'react'
import { StatusBar } from "expo-status-bar"
import styles from './styles'

export default function Index() {
  const [scores, setScores] = useState({player_1: 0, player_2: 0})
  const [scoreHistory, setScoreHistory] = useState([""])
  const [standing, setStanding] = useState({player_1: 0, player_2: 0})
  const [scoreRecord, setScoreRecord] = useState([{}])
  const [alerted, setAlerted] = useState(false)

  const GameWin = (player: keyof typeof scores) => {
      IncrementStanding(player)
      setScoreHistory(scores => [...scores, `${player} won`])
      if (player == "player_1"){
        Alert.alert("Player 1 won!")
      } else {
        Alert.alert("Player 2 won!")
      }
      setScoreRecord(currentRecord => [...currentRecord, scores ])
      NewSet()
  }
  const IncrementScore = (player: keyof typeof scores) => { 
    const newScores = {...scores, [player]: scores[player] + 1}
    setScores(newScores)
    if (newScores[player] == 11){
      GameWin(player)
      return
    }
    setScoreHistory(scores => [...scores, player])
  }

  const IncrementStanding = (player: keyof typeof scores) => {
    setStanding(currentStanding => ({...currentStanding, [player]: currentStanding[player] + 1}))
  }

  const DecrementScore = (player: keyof typeof scores) => {
    setScores(currentScores => ({...currentScores, [player]: currentScores[player] - 1}))
  }

  const DecrementStanding = (player: keyof typeof scores) => {
    setStanding(currentStanding => ({...currentStanding, [player]: currentStanding[player] - 1}))
  }

  const NewSet = () => {
    setScores({player_1: 0, player_2: 0})
  }

  const Reset = () => {
    if (!alerted){
      Alert.alert("WARNING!", "Reset cannot be undone", [{ 
        text: "Ok",
        onPress: () => {
          setAlerted(true)
          return}
      }])
    } else {
      setScores({player_1: 0, player_2: 0})
      setStanding({player_1: 0, player_2: 0})
      setScoreHistory([""])
      setScoreRecord([{}])
    }
  }

  const UndoStanding = () => {
      const pastRecord = scoreRecord[scoreRecord.length - 1]
      const newScores = {
        player_1: pastRecord["player_1" as keyof typeof pastRecord], 
        player_2: pastRecord["player_2" as keyof typeof pastRecord]}
      setScoreRecord([...scoreRecord.slice(0, scoreRecord.length-1)])
      setScores(newScores)
  }

  const Undo = () => {
    const index = scoreHistory.length - 1
    switch (scoreHistory[index]) {
      case "player_1":
        DecrementScore("player_1")
        break
      case "player_2":
        DecrementScore("player_2")
        break
      case "player_1 won":
        DecrementStanding("player_1") 
        UndoStanding()
        break
      case "player_2 won":
        DecrementStanding("player_2") 
        UndoStanding()
        break
    }
    setScoreHistory([...scoreHistory.slice(0, index)])
  }

  return (
    <View style={styles.main_view}>
      <StatusBar hidden={true}></StatusBar>

      <Pressable onPress={() => IncrementScore("player_1")}>
        <Text style={styles.player_1}>{String(scores.player_1).padStart(2, "0")}</Text>
      </Pressable>

      <View style= {styles.controls_view}>
        <Text style={styles.standing}>{standing.player_1}-{standing.player_2}</Text>
        <Pressable onPress={Reset}>
          <Text style={styles.reset}>Reset</Text>
        </Pressable>

        <Pressable onPress={Undo}>
          <Text style={styles.reset}>Undo</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => IncrementScore("player_2")}>
        <Text style={styles.player_2}>{String(scores.player_2).padStart(2, "0")}</Text>
      </Pressable>
    </View>
  )
}

import { Text, View, Pressable, Alert } from "react-native"
import { useState } from 'react'
import { StatusBar } from "expo-status-bar"
import styles from './styles'

export default function Index() {
  const [scores, setScores] = useState({player_1: 0, player_2: 0})
  const [history, setHistory] = useState([""])
  const [standing, setStanding] = useState({player_1: 0, player_2: 0})
  const [matchRecord, setMatchRecord] = useState([{}]) // save scores whenever a set ends
  const [prevRecord, setPrevRecord] = useState([{}]) // save matchRecord whenever resetted
  const [gameState, setGameState] = useState({ // save scores and standing whenever resetted
    player_1: 0,
    player_2: 0,
    player_1_standing: 0,
    player_2_standing: 0
  })
  const [toServe, setToServe] = useState("player_1")
  const [switched, setSwitched] = useState(false)
  const [deuce, setDeuce] = useState(false)
  const [advantage, setAdvantage] = useState("")

  const ChangeService = () => {
    if (toServe == "player_1"){
      setToServe("player_2")
    } else {
      setToServe("player_1")
    }
  }

  const CheckService = (player_1: number, player_2: number) => {
    if ((player_1 + player_2) % 2 != 0){
      return
    }
    ChangeService()
  }

  const SwitchSides = () => {
    setSwitched(switched ? false: true)
  }

  const GameWin = (player: keyof typeof scores) => {
      IncrementStanding(player)
      setHistory(prevHistory => [...prevHistory, `${player} won`])
      Alert.alert(player == "player_1" ? "Player 1 won!": "Player 2 won!")
      setMatchRecord(prevMatchRecord => [...prevMatchRecord, scores ])
      NewSet()
  }

  const DeucePoint = (player: keyof typeof scores) => {
    if (advantage == player){
      GameWin(player)
      setAdvantage("")
      setDeuce(false)
    }
  }

  const CheckDeuce = (newScores: typeof scores) => {
    if (newScores.player_1 == 10 && newScores.player_2 == 10){
      setDeuce(true)
      return
    }
  }

  const IncrementScore = (player: keyof typeof scores) => { 
    const newScores = {...scores, [player]: scores[player] + 1}
    setScores(newScores)
    if (deuce){
      setAdvantage(player)
      DeucePoint(player)
      ChangeService()
      return 
    }
    CheckService(newScores.player_1, newScores.player_2)
    CheckDeuce(newScores)
    if (newScores[player] == 11){
      GameWin(player)
      return
    }
    setHistory(prevHistory => [...prevHistory, player])
  }

  const IncrementStanding = (player: keyof typeof scores) => {
    setStanding(prevStanding => ({...prevStanding, [player]: prevStanding[player] + 1}))
  }

  const DecrementScore = (player: keyof typeof scores) => {
    if (scores[player] <= 0) return
    setScores(prevScores => ({...prevScores, [player]: prevScores[player] - 1}))
    CheckService(scores.player_1, scores.player_2)
  }

  const DecrementStanding = (player: keyof typeof scores) => {
    setStanding(prevStanding => ({...prevStanding, [player]: prevStanding[player] - 1}))
  }

  const NewSet = () => {
    setScores({player_1: 0, player_2: 0})
  }

  const Reset = () => {
      setGameState(prevGameState => ({...prevGameState, 
        player_1: scores.player_1,
        player_2: scores.player_2,
        player_1_standing: standing.player_1,
        player_2_standing: standing.player_2
      }))
      setPrevRecord(matchRecord)
      setScores({player_1: 0, player_2: 0})
      setStanding({player_1: 0, player_2: 0})
      setHistory(prevHistory => ([...prevHistory, "resetted"]))
      setToServe("player_1")
      setMatchRecord([{}])
  }

  const UndoReset = () => {
    setScores({player_1: gameState.player_1, player_2:gameState.player_2})
    setStanding({player_1: gameState.player_1_standing, player_2: gameState.player_2_standing})
    setMatchRecord(prevRecord)
  }

  const UndoStanding = () => {
      const pastRecord = matchRecord[matchRecord.length - 1]
      const newScores = {
        player_1: pastRecord["player_1" as keyof typeof pastRecord], 
        player_2: pastRecord["player_2" as keyof typeof pastRecord]}
      setMatchRecord([...matchRecord.slice(0, matchRecord.length-1)])
      setScores(newScores)
  }

  const Undo = () => {
    const index = history.length - 1
    switch (history[index]) {
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
      case "resetted":
        UndoReset()
        break

    }
    setHistory([...history.slice(0, index)])
  }

  const ScoreButton = ({ player, label }: {player: keyof typeof scores, label: string}) => {
    return (
      <Pressable onPress={() => IncrementScore(player)}>
        <View style={toServe == player ? styles.player_serve : styles.score_view}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.player}>{String(scores[player]).padStart(2, "0")}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.main_view}> 
      <StatusBar hidden={true}></StatusBar>
      <ScoreButton 
        player= {!switched ? "player_1" : "player_2"}
        label= {!switched ? "Player 1" : "Player 2"}
      ></ScoreButton>

      <View style= {styles.controls_view}>
        <Text style={styles.standing}>{!switched ? standing.player_1: standing.player_2}-{!switched ? standing.player_2 : standing.player_1}</Text>
        <Pressable onPress={Reset}>
          <Text style={styles.ctrl_btn}>Reset</Text>
        </Pressable>

        <Pressable onPress={SwitchSides}>
          <Text style={styles.ctrl_btn}>Switch</Text>
        </Pressable>

        <Pressable onPress={Undo}>
          <Text style={styles.ctrl_btn}>Undo</Text>
        </Pressable>
      </View>

      <ScoreButton 
        player= {!switched ? "player_2" : "player_1"}
        label= {!switched ? "Player 2" : "Player 1"}
      ></ScoreButton>
    </View>
  )
}
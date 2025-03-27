import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
main_view: {
    backgroundColor: 'black',
    flexDirection: "row",
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
},
controls_view: {
    flexDirection: "column",
    gap: 20,
},
standing: {
    color: 'white',
    fontSize: 60,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 20,
},
player_1: {
    padding: 30,
    color: 'white',
    fontSize: 190,
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 50,
},
player_1_serve: {
    padding: 30,
    color: 'white',
    fontSize: 190,
    borderColor: 'red',
    backgroundColor: "#32a852",
    borderWidth: 5,
    borderRadius: 50,
},
player_2: {
    padding: 30,
    color: 'white',
    fontSize: 190,
    borderColor: 'blue',
    borderWidth: 5,
    borderRadius: 50,
},
player_2_serve: {
    padding: 30,
    color: 'white',
    fontSize: 190,
    backgroundColor: "#32a852",
    borderColor: 'blue',
    borderWidth: 5,
    borderRadius: 50,
},
reset: {
    color: 'white',
    fontSize: 50,
    textAlign:'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    padding: 5,
}
})

export default styles
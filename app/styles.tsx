import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
main_view: {
    backgroundColor: '#11111b',
    flexDirection: "row",
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
},
controls_view: {
    flexDirection: "column",
    gap: 10,
},
standing: {
    color: 'white',
    fontSize: 70,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: '#32a852',
    borderRadius: 20,
},
score_view: {
    borderColor: 'transparent',
    borderWidth: 10,
    borderRadius: 50,
    flexDirection: "column",
    alignItems:'center'
},
label: {
    fontSize: 40,
    color:"white",
    textAlign: 'center',
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    marginBottom: 0
},
player: {
    padding: 30,
    color: 'white',
    margin: 0,
    top: 10,
    fontSize: 200,
    borderWidth: 0
},
player_serve: {
    borderColor: 'transparent',
    borderWidth: 10,
    borderRadius: 50,
    margin: 0,
    backgroundColor: "#32a852",
},
player_serve_deuce: {
    borderColor: 'transparent',
    borderWidth: 10,
    borderRadius: 50,
    margin: 0,
    backgroundColor: "#32a852",
},
ctrl_btn: {
    color: 'white',
    fontSize: 35,
    textAlign:'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    padding: 5,
}
})

export default styles
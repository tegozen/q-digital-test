import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
    marginBottom: 10
  },
  button: {
    padding: 10,
    backgroundColor: 'black',
  },
  button__text: {
    color: 'white',
  },
  button_switch: {
    marginBottom: 10
  },
  sliderWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  slider: {
    backgroundColor: 'black',
    flex: 1,
    height: 200,
    margin: 10
  },
  preloader: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default style;
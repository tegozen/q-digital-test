import React from 'react';
import { Link } from 'react-router-native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Connect } from '../redux';
import ROUTES from '../routes';
import i0 from '../../img/0.jpg'
import i1 from '../../img/1.jpg'
import i2 from '../../img/2.jpg'
import style from '../../scss';
const Images = [i0, i1, i2];

export class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLocal: true,
      count: 0,
      isLoading: true,
    }
  }

  componentDidMount() {
    fetch('https://imagesapi.osora.ru').then(res => res.json()).then(images => {
      this.props.setRedux({ Remote: images.map(uri => ({ uri })) })
      this.setState({ isLoading: false })
    })
  }

  onSwitch = () => this.setState({ count: 0, isLocal: !this.state.isLocal })

  getImages = () => this.state.isLocal ? Images : this.props.Remote;

  onPrev = () => {
    const images = this.getImages();
    let { count } = this.state;
    if (--count < 0) {
      count = images.length - 1;
    }
    this.setState({ count })
  }

  onNext = () => {
    const images = this.getImages();
    let { count } = this.state;
    if (++count > images.length - 1) {
      count = 0;
    }
    this.setState({ count })
  }

  render() {
    const { isLocal, count, isLoading } = this.state;
    const images = this.getImages()
    return (
      <View style={style.page}>
        {isLoading && <Text style={style.preloader}>Загрузка</Text>}
        <View style={style.sliderWrapper}>
          <TouchableOpacity style={style.button} onPress={this.onPrev}>
            <Text style={style.button__text}>prev</Text>
          </TouchableOpacity>
          <Image style={style.slider} source={images[count]} />
          <TouchableOpacity style={style.button} onPress={this.onNext}>
            <Text style={style.button__text}>next</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.onSwitch} style={{ ...style.button, ...style.button_switch }}>
          <Text style={style.button__text}>switch to {isLocal ? 'remote' : 'local'}</Text>
        </TouchableOpacity>
        <Link style={style.button} to={ROUTES.main.path} >
          <Text style={style.button__text}>back to main</Text>
        </Link>
      </View>
    )
  }
}

export default Connect(Slider)
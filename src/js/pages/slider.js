import React from 'react';
import { Link } from 'react-router-dom';
import { Connect } from '../redux';
import ROUTES from '../routes';
import i0 from '../../img/0.jpg'
import i1 from '../../img/1.jpg'
import i2 from '../../img/2.jpg'
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
      this.props.setRedux({ Remote: images })
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
      <div className="page">
        {isLoading && <div className="preloader">Загрузка</div>}
        <div className="sliderWrapper">
          <div onClick={this.onPrev} className="button">prev</div>
          <img className="slider" alt="" src={images[count]} />
          <div onClick={this.onNext} className="button">next</div>
        </div>
        <div onClick={this.onSwitch} className="button button_switch">switch to {isLocal ? 'remote' : 'local'}</div>
        <Link to={ROUTES.main.path} className="button">back to main</Link>
      </div>
    )
  }
}

export default Connect(Slider)
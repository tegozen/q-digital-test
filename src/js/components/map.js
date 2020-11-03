import React from 'react';
import api from '../api';
import data from '../data';
import { Connect } from '../redux';

export class Map extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.isMapOpened !== nextProps.isMapOpened || this.props.currentId !== nextProps.currentId) {
      return true
    }
    return false
  }

  onClick = () => this.props.setRedux({ isMapOpened: !this.props.isMapOpened })

  onClickByDot = id => {
    const { app, isMapOpened } = this.props;
    if (isMapOpened) {
      app.cameraToMarker({ id }, false)
    }
  }

  render() {
    const { isMapOpened, currentId } = this.props;
    return (
      <div onClick={this.onClick} className={api.setClasses(['map'], {
        active: isMapOpened
      })}>
        <div className="map__container">
          {data.map((item, key) => {
            return <div className={api.setClasses(['map__container__dot'], { active: currentId === item.id })} style={{
              left: `${item.coords.x * 20 + 50}%`,
              top: `${item.coords.z * 2 + 50}%`
            }}
              key={key}
              onClick={() => {
                this.onClickByDot(item.id)
              }}
            />
          })}
        </div>
      </div>
    )
  }
}

export default Connect(Map)
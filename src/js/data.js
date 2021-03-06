const data = [
  {
    id: 0,
    path: "locations/pano_1.png",
    coords: {
      x: 0,
      y: 0,
      z: 0
    },
    description: 'центр перекрестка',
    siblings: [1, 2, 3]
  },
  {
    id: 1,
    path: "locations/pano_2.png",
    coords: {
      x: 1,
      y: 0,
      z: 0
    },
    description: 'у пекарни',
    siblings: [0, 5],
    direction: 130
  },
  {
    id: 2,
    path: "locations/pano_3.png",
    coords: {
      x: 1.5,
      y: 0,
      z: 1
    },
    description: 'возле рекламы',
    siblings: [0],
    direction: 90
  },
  {
    id: 3,
    path: "locations/pano_4.png",
    coords: {
      x: -1,
      y: 0,
      z: 0
    },
    description: 'напротив пекарни',
    siblings: [0, 7]
  },
  {
    id: 5,
    path: "locations/pano_2_2.png",
    coords: {
      x: 1,
      y: 0,
      z: -10
    },
    description: 'слева от пекарни',
    siblings: [1, 6],
    direction: 90
  },
  {
    id: 6,
    path: "locations/pano_2_2_1.png",
    coords: {
      x: 1,
      y: 0,
      z: -20
    },
    description: 'еще левее пекарни',
    siblings: [5],
    direction: 90
  },
  {
    id: 7,
    path: "locations/pano_4_1.png",
    coords: {
      x: -2,
      y: 0,
      z: 0
    },
    description: 'еще дальше от пекарни',
    siblings: [3]
  },
]

export default data;
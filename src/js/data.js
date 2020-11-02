const data = [
  {
    id: 1,
    path: "locations/pano_1.png",
    coords: {
      x: 2,
      y: 0,
      z: -.1
    },
    siblings: [2, 3]
  },
  {
    id: 2,
    path: "locations/pano_4.png",
    coords: {
      x: -2,
      y: 0,
      z: 0.1
    },
    siblings: [1, 3, 7]
  },
  {
    id: 3,
    path: "locations/pano_2_2_1.png",
    coords: {
      x: 1,
      y: 0,
      z: 3
    },
    siblings: [1, 2, 4, 5]
  },
  {
    id: 4,
    path: "locations/pano_2_2.png",
    coords: {
      x: 3,
      y: 0,
      z: 3
    },
    siblings: [3, 5, 7]
  },
  {
    id: 5,
    path: "locations/pano_2.png",
    coords: {
      x: 2,
      y: 0,
      z: 6
    },
    siblings: [3, 4, 6]
  },
  {
    id: 6,
    path: "locations/pano_3.png",
    coords: {
      x: -2,
      y: 0,
      z: 3
    },
    siblings: [5, 7]
  },
  {
    id: 7,
    path: "locations/pano_4_1.png",
    coords: {
      x: -3,
      y: 0,
      z: 0.3
    },
    siblings: [2]
  },
  {
    id: 8,
    path: "locations/pano_2_1.png",
    coords: {
      x: 6,
      y: 0,
      z: 2
    },
    siblings: [4, 7]
  }
]

export default data;
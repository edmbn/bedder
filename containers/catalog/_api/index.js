const fetchDevices = new Promise(resolve => {
  setTimeout(() => {
    resolve([
      {
        id: 1,
        model: 'Galaxy S10',
        type: 'Móvil',
        owner: 'Javier Fernández',
        requester: null,
        deliveryDate: '30/04/2019',
        petitionReason: 'Pruebas aplicación de compras con Android 9.0',
        thumbnail: 'galaxyS10.jpg',
        status: 'unavailable',
      },
      {
        id: 2,
        model: 'Galaxy A6',
        type: 'Móvil',
        owner: null,
        requester: null,
        deliveryDate: null,
        petitionReason: null,
        thumbnail: 'galaxyA6.jpg',
        status: 'available',
      },
      {
        id: 3,
        model: 'iPhone 8',
        type: 'Móvil',
        owner: null,
        requester: 'Javier Fernández',
        deliveryDate: null,
        petitionReason: 'Pruebas aplicación de compras con iOS 12.2',
        thumbnail: 'iPhone8.jpg',
        status: 'requested',
      },
      {
        id: 4,
        model: 'LG V30',
        type: 'Móvil',
        owner: null,
        requester: null,
        deliveryDate: null,
        petitionReason: null,
        thumbnail: 'LGV30.jpg',
        status: 'available',
      },
      {
        id: 5,
        model: 'Xperia L2',
        type: 'Móvil',
        owner: null,
        requester: null,
        deliveryDate: null,
        petitionReason: null,
        thumbnail: 'XperiaL2.jpg',
        status: 'available',
      },
    ])
  }, 500)
})

export default {
  fetchDevices,
}

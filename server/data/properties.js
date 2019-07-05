import cloudinary from 'cloudinary';

const properties = [
  {
    id: 1,
    owner: 1, // user id
    status: 'available', // sold,available - default is available
    price: 2000000,
    state: 'Rwanda', // State where property is located
    city: 'Kigali', // City where property is located
    address: 'KN 130 st',
    type: '2 bedroon', // 2 bedroom, 3 bedroom etc
    created_on: 'July 5, 2019',
    image_url: 'https://via.placeholder.com/150',
  }
]

export default properties;

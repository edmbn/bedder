const devicesAvailable = state => state.devices.filter(device => device.status === 'available');
const devicesUnavailable = state => state.devices.filter(device => device.status === 'unavailable');
const devicesRequested = state => state.devices.filter(device => device.status === 'requested');
const devicesByOwner = state => owner => state.devices.filter(device => device.owner === owner);

export default {
  devicesAvailable,
  devicesUnavailable,
  devicesByOwner,
  devicesRequested,
};

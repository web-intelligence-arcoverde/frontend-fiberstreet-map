export const handlePosition = () => {
  const options = {
    enableHighAccuracy: true
  };
  navigator.geolocation.getCurrentPosition(
    pos => {
      const center = [pos.coords.longitude, pos.coords.latitude];
      this.setState({
        center: center
      });
    },
    err => {},
    options
  );
};

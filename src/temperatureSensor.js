import i2c from 'i2c-bus';

export function getTemperatureData() {
  try {
    // I2C-Bus-Nummer und Geräteadresse
    const busNumber = 1;
    const deviceAddress = 0x48;

    // Registeradressen
    const registerAddress1 = 0x00;
    const registerAddress2 = 0x22;

    // SMBus-Objekt erstellen
    const bus = i2c.openSync(busNumber);

    // Wert aus Register 0x00 lesen
    const data1 = bus.readByteSync(deviceAddress, registerAddress1);
    // Wert aus Register 0x22 lesen
    const data2 = bus.readByteSync(deviceAddress, registerAddress2);

    // Berechne den Dezimalwert
    const decimalValue = parseInt(data1.toString(16), 16);

    const binaryValue2 = data2.toString(2);

    let result = 0.0;
    if (binaryValue2 === '10000000') {
      result = 0.5;
    } else if (binaryValue2 === '01000000') {
      result = 0.25;
    } else if (binaryValue2 === '00100000') {
      result = 0.125;
    } else if (binaryValue2 === '11000000') {
      result = 0.5 + 0.25;
    } else if (binaryValue2 === '01100000') {
      result = 0.25 + 0.125;
    } else if (binaryValue2 === '11100000') {
      result = 0.5 + 0.25 + 0.125;
    } else {
      result = 0; // Wenn die Binärzahl nicht übereinstimmt
    }

    const temperature = decimalValue + result;

    bus.closeSync();

    return {
      temperature,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in getTemperatureData:', error.message);

    return {
      error: true,
      message: error.message
    };
  }
}

export function runTemperatureInterval(interval, callback) {
  setInterval(() => {
    const currentTemperatureData = getTemperatureData();

    if (!currentTemperatureData.error) {
      callback({
        temperature: currentTemperatureData.temperature,
        timestamp: currentTemperatureData.timestamp
      });
    } else {
      console.error(
        'Failed to retrieve temperature data:',
        currentTemperatureData.message
      );
    }
  }, interval);
}

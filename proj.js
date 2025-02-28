function convertToIEEE754() {
    const decimalInput = document.getElementById("decimalInput").value;
    const binaryOutput = document.getElementById("binaryOutput");
    const explanation = document.getElementById("explanation");
  
    if (decimalInput === "" || isNaN(decimalInput)) {
      binaryOutput.textContent = "Please enter a valid decimal number.";
      explanation.textContent = "";
      return;
    }
  
    const number = parseFloat(decimalInput);
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, number, false); // false for little-endian
  
    const binaryString = Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(2).padStart(8, "0"))
      .join("");
  
    binaryOutput.textContent = binaryString;
  
    // Explanation of the binary representation
    const signBit = binaryString[0];
    const exponentBits = binaryString.substring(1, 9);
    const mantissaBits = binaryString.substring(9);
  
    const sign = signBit === "1" ? "Negative" : "Positive";
    const exponentValue = parseInt(exponentBits, 2) - 127;
    const mantissaValue = parseFloat(`1.${mantissaBits}`);
  
    explanation.innerHTML = `
      <strong>Explanation:</strong><br>
      - <strong>Sign Bit:</strong> ${signBit} (${sign})<br>
      - <strong>Exponent Bits:</strong> ${exponentBits} (Value: ${exponentValue})<br>
      - <strong>Mantissa Bits:</strong> ${mantissaBits} (Value: ${mantissaValue})<br>
      <br>
      The IEEE 754 32-bit floating-point format consists of:<br>
      - 1 bit for the sign (${signBit}),<br>
      - 8 bits for the exponent (${exponentBits}),<br>
      - 23 bits for the mantissa (${mantissaBits}).
    `;
  }
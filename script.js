function calculateAlkalinities() {
  // Get the input values
  const VolSample = parseFloat(document.getElementById("VolOfFiltrate").value);
  const NormAcid = parseFloat(document.getElementById("NAcid").value);
  const V1 = parseFloat(document.getElementById("Pfiltrate").value);
  const V2 = parseFloat(document.getElementById("Mfiltrate").value);

  let hydroxide = 0;
  let carbonate = 0;
  let bicarbonate = 0;

  // Validate input values
  if (isNaN(VolSample) || isNaN(NormAcid) || isNaN(V1) || isNaN(V2)) {
    alert("Please enter valid numeric values for all inputs.");
    return;
  }

  if (V1 < 0) {
    alert("The value of acid used for Phenolphthalein must be 0 or greater.");
    return;
  }
  if (V2 < 0) {
    alert("The value of acid for M. Orange must be 0 or greater.");
    return;
  }

  const Pf = ((V1 / VolSample) * NormAcid) / 0.02;
  const Mf1 = ((V2 / VolSample) * NormAcid) / 0.02;
  const Mf = Pf + Mf1;

  // Determine alkalinity based on the conditions provided
  if (Pf === 0) {
    // Alkalinity is due to bicarbonate ions only
    bicarbonate = Mf * 1220;
    document.getElementById(
      "result"
    ).innerHTML = `<strong>Alkalinity due to Bicarbonate ions only.<br>Bicarbonate: ${bicarbonate.toFixed(
      2
    )} mg/L</strong>`;
  } else if (Pf === Mf) {
    // Alkalinity is due to hydroxide ions only
    hydroxide = Pf * 340;
    document.getElementById(
      "result"
    ).innerHTML = `<strong>Alkalinity due to Hydroxide ions only.<br>Hydroxide: ${hydroxide.toFixed(
      2
    )} mg/L</strong>`;
  } else if (2 * Pf < Mf) {
    // Alkalinity is due to carbonate and bicarbonate ions
    carbonate = 2 * Pf * 600;
    bicarbonate = (Mf - 2 * Pf) * 1220;
    document.getElementById(
      "result"
    ).innerHTML = `<strong>Alkalinity due to Carbonate and Bicarbonate ions.<br>Carbonate: ${carbonate.toFixed(
      2
    )} mg/L<br>Bicarbonate: ${bicarbonate.toFixed(2)} mg/L</strong>`;
  } else if (2 * Pf === Mf) {
    // Alkalinity is due to carbonate ions only
    carbonate = Mf * 600;
    document.getElementById(
      "result"
    ).innerHTML = `<strong>Alkalinity due to Carbonate ions only.<br>Carbonate: ${carbonate.toFixed(
      2
    )} mg/L</strong>`;
  } else if (2 * Pf > Mf) {
    // Alkalinity is due to hydroxide and carbonate ions
    hydroxide = (2 * Pf - Mf) * 340;
    carbonate = (Mf - Pf) * 1200;
    document.getElementById(
      "result"
    ).innerHTML = `<strong>Alkalinity due to Hydroxide and Carbonate ions.<br>Hydroxide: ${hydroxide.toFixed(
      2
    )} mg/L<br>Carbonate: ${carbonate.toFixed(2)} mg/L</strong>`;
  } else {
    // If none of the conditions match, display a message
    document.getElementById(
      "result"
    ).innerHTML = `<strong>Unable to determine alkalinity due to mismatched values.</strong>`;
  }
}

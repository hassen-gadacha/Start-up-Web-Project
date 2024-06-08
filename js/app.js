// Price and benefits for each VIP level
const prices = {
  Bronze: 100,
  Silver: 200,
  Gold: 300,
  Platinum: 400
};

const benefits = {
  Bronze: "10% off on all products",
  Silver: "20% off on all products and free shipping",
  Gold: "30% off on all products, free shipping and a free gift",
  Platinum: "40% off on all products, free shipping, free gift and access to exclusive events"
};

// Update price and benefits based on selected VIP level
const vipLevelSelect = document.getElementById("vip-level");
const price = document.getElementById("price");
const benefitsText = document.getElementById("benefits");

vipLevelSelect.addEventListener("change", () => {
  const selectedLevel = vipLevelSelect.value;
  price.innerText = "$"+ prices[selectedLevel];
  benefitsText.innerText = benefits[selectedLevel];
});
function verifierFormulaire() {
  var nom = document.getElementById("nom");
  var prenom = document.getElementById("prenom");
  var email = document.getElementById("email");

  var erreurs = [];

  if (nom.value === "") {
      erreurs.push("Le champ Nom est obligatoire.");
      nom.style.border="2px solid red";
      nom.placeholder="this field needed";
  }

  if (prenom.value === "") {
      erreurs.push("Le champ Prenom est obligatoire.");
      prenom.style.border="2px solid red";
      prenom.placeholder="this field needed";
  }

  if (email.value === "") {
      erreurs.push("Le champ Email est obligatoire.");
      email.style.border="2px solid red";
      email.placeholder="this field needed";
  }

  if (erreurs.length > 0) {
      var messageErreur = "Le formulaire contient les erreurs suivantes :\n";
      for (var i = 0; i < erreurs.length; i++) {
          messageErreur += "- " + erreurs[i] + "\n";
      }

      alert(messageErreur);
      return false;
  }
  return true;
}
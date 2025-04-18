document.addEventListener("DOMContentLoaded", () => {
  const tiers = [
    { name: "Platinum VIP", color: "#d4af37", price: 500, sections: ["1", "2", "3"] },
    { name: "Gold Circle GA", color: "#f5c542", price: 300, sections: ["4", "5", "6", "7", "8", "9"] },
    { name: "Premium Lower Bowl", color: "#1f77b4", price: 210, sections: ["100", "101", "102", "103", "112", "113", "121"] },
    { name: "Standard Lower Bowl", color: "#2ca02c", price: 150, sections: ["104", "105", "106", "107", "108", "109", "110", "111", "114", "115", "116", "117", "118", "119", "120"] },
    { name: "Club Level", color: "#9467bd", price: 125, sections: ["200-228"] },
    { name: "Upper Level", color: "#8c564b", price: 75, sections: ["400-433"] },
  ];

  const addons = {
    bar: 60,
    backstage: 300
  };

  const tierSelect = document.getElementById("tier-select");
  const addonsSelect = document.getElementById("addons");
  const chart = document.getElementById("seating-chart");
  const spotifyCheck = document.getElementById("spotify-user");
  const spotifyPerks = document.getElementById("spotify-perks");

  tiers.forEach((tier, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = tier.name;
    tierSelect.appendChild(option);
  });

  function renderTier(index) {
    chart.innerHTML = "";
    const tier = tiers[index];
    const selectedAddons = Array.from(addonsSelect.selectedOptions).map(opt => opt.value);
    const addonTotal = selectedAddons.reduce((sum, key) => sum + addons[key], 0);
    const totalPrice = tier.price + addonTotal;

    const ticket = document.createElement("div");
    ticket.classList.add("ticket-card");
    ticket.innerHTML = `
      <img src="https://cdn-icons-png.flaticon.com/512/1030/1030870.png" class="ticket-img" alt="ticket" style="background-color: ${tier.color};">
      <div class="ticket-info">
        <h2>${tier.name}</h2>
        <p><strong>Base Price:</strong> $${tier.price}</p>
        <p><strong>Add-Ons:</strong> $${addonTotal}</p>
        <p><strong>Total:</strong> $${totalPrice}</p>
        <p><strong>Sections:</strong> ${tier.sections.join(", ")}</p>
        <p><em>🎁 Includes a free light bracelet!</em></p>
        ${spotifyCheck.checked ? '<p><strong>🎧 Spotify Bonus:</strong> Early access + concert hoodie</p>' : ''}
      </div>
    `;
    chart.appendChild(ticket);
  }

  tierSelect.addEventListener("change", (e) => {
    if (e.target.value) renderTier(e.target.value);
  });

  addonsSelect.addEventListener("change", () => {
    if (tierSelect.value) renderTier(tierSelect.value);
  });

  spotifyCheck.addEventListener("change", () => {
    spotifyPerks.style.display = spotifyCheck.checked ? "block" : "none";
    if (tierSelect.value) renderTier(tierSelect.value);
  });
});

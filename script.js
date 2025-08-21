// Sample Events
let events = [
  { name: "Hackathon 2025", college: "KBN College", date: "2025-09-10", category: "tech", mode: "offline", link: "#", image: "" },
  { name: "Cultural Fest", college: "JNTU Kakinada", date: "2025-09-15", category: "cultural", mode: "offline", link: "#", image: "" },
  { name: "Sports Meet", college: "Eluru Engg College", date: "2025-09-20", category: "sports", mode: "online", link: "#", image: "" }
];

const grid = document.getElementById("events-grid");
const tabs = document.querySelectorAll(".tab");
const searchBar = document.getElementById("searchBar");
let currentCategory = "all";
let searchQuery = "";

// Render Events
function renderEvents() {
  grid.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];

  const filtered = events.filter(ev => {
    // skip expired events
    if (ev.date < today) return false;

    const matchesCategory =
      currentCategory === "all" || ev.category === currentCategory || ev.mode === currentCategory;

    const matchesSearch =
      ev.name.toLowerCase().includes(searchQuery) ||
      ev.college.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  if (!filtered.length) {
    grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No events found.</p>";
    return;
  }

  filtered.forEach(ev => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${ev.image || 'https://via.placeholder.com/300x150?text=Event+Image'}" alt="${ev.name}">
      <div class="card-body">
        <h3>${ev.name}</h3>
        <p><strong>College:</strong> ${ev.college}</p>
        <p><strong>Date:</strong> ${ev.date}</p>
        <p><strong>Category:</strong> ${ev.category} (${ev.mode})</p>
        <a href="${ev.link}" target="_blank">Register Now</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Tabs
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentCategory = tab.getAttribute("data-cat");
    renderEvents();
  });
});

// Search
searchBar.addEventListener("input", e => {
  searchQuery = e.target.value.toLowerCase();
  renderEvents();
});

// Modal Functions
function showAddForm() {
  document.getElementById("addEventModal").style.display = "flex";
}
function closeAddForm() {
  document.getElementById("addEventModal").style.display = "none";
}
function addEvent() {
  const name = document.getElementById("eventName").value;
  const college = document.getElementById("eventCollege").value;
  const date = document.getElementById("eventDate").value;
  const category = document.getElementById("eventCategory").value;
  const mode = document.getElementById("eventMode").value;
  const link = document.getElementById("eventLink").value;
  const imageFile = document.getElementById("eventImage").files[0];

  if (!name || !college || !date) {
    alert("Please fill all required fields!");
    return;
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      events.push({ name, college, date, category, mode, link, image: e.target.result });
      closeAddForm();
      renderEvents();
    };
    reader.readAsDataURL(imageFile);
  } else {
    events.push({ name, college, date, category, mode, link, image: "" });
    closeAddForm();
    renderEvents();
  }
}

// Initial Render
renderEvents();

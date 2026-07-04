const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const galleryItems = [
  {
    slug: "herbinator-pcb",
    title: "Smart Plant Watering System PCB",
    category: "Hardware from Scratch",
    date: "Sep 2025 - July 2026",
    image: "/images/HerbinatorPCB.png",
    summary: "A custom PCB for the Plant Watering System with an embedded ESP32 chip.",
    description: "A PCB for the Plant Watering System that condenses the ESP32 Microcontroller, power sources, " +
        "status LEDs, and peripheral sensors.",
  },
  {
    slug: "keyboard-pcb",
    title: "MasterZen Keyboard PCB",
    category: "Hardware from Scratch",
    date: "Mar 2026 - Present",
    image: "/images/KeyboardPCB.png",
    summary: "An in-progress PCB for a keyboard being built from scratch with an emphasis on learning.",
    description: "A keyboard PCB being designed from scratch with an ATMega microcontroller and a diode matrix of " +
        "switches for the keys. Will also be soldered by hand once the PCB is fabricated.",
  },
  {
    slug: "voxel-destruction",
    title: "Voxel Destruction System",
    category: "Client/Server Software",
    date: "Sep 2024 - Aug 2025",
    image: "/images/voxel-destruct.webp",
    summary: "A voxel destruction system built for multiplayer games using a client/server architecture.",
    description: "A voxel destruction designed for multiplayer games that converts a static pre-built game map" +
        "into a fully destructible variant players can interact with. Uses Octrees to store the voxel mesh and uses " +
        "client-server architecture for responsiveness on client devices while the server validates the voxel mesh.",
  }
];

app.get("/", function (req, res) {
  res.render("index", {
    title: "Home",
    activePage: "home"
  });
});

app.get("/gallery", function (req, res) {
  res.render("gallery", {
    title: "Gallery",
    activePage: "gallery",
    items: galleryItems
  });
});

app.get("/gallery/:slug", function (req, res) {
  const selectedSlug = req.params.slug;

  const selectedItem = galleryItems.find(function (item) {
    return item.slug === selectedSlug;
  });

  if (!selectedItem) {
    return res.status(404).render("not-found", {
      title: "Not Found",
      activePage: "gallery"
    });
  }

  res.render("details", {
    title: selectedItem.title,
    activePage: "gallery",
    item: selectedItem
  });
});

app.listen(PORT, function () {
  console.log("Project Portfolio Gallery starter is running.");
  console.log("Open http://localhost:" + PORT);
});

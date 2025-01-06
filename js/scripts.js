// Add event listeners for the buttons
document.getElementById("derslerBtn").addEventListener("click", function () {
    // Hide all content and show dersler content
    document.getElementById("homeContent").classList.add("hidden");
    document.getElementById("genelBilgilerContent").classList.add("hidden");
    document.getElementById("bilgisayarBilimleriContent").classList.add("hidden");
    document.getElementById("derslerContent").classList.remove("hidden");
});

document.getElementById("genelBilgilerBtn").addEventListener("click", function () {
    // Hide all content and show genel bilgiler content
    document.getElementById("homeContent").classList.add("hidden");
    document.getElementById("derslerContent").classList.add("hidden");
    document.getElementById("bilgisayarBilimleriContent").classList.add("hidden");
    document.getElementById("genelBilgilerContent").classList.remove("hidden");
});

document.getElementById("bilgisayarBilimleriBtn").addEventListener("click", function () {
    // Hide all content and show bilgisayar bilimleri content
    document.getElementById("homeContent").classList.add("hidden");
    document.getElementById("derslerContent").classList.add("hidden");
    document.getElementById("genelBilgilerContent").classList.add("hidden");
    document.getElementById("bilgisayarBilimleriContent").classList.remove("hidden");
});

document.getElementById("homeBtn").addEventListener("click", function () {
    // Show home content and hide others
    document.getElementById("derslerContent").classList.add("hidden");
    document.getElementById("genelBilgilerContent").classList.add("hidden");
    document.getElementById("bilgisayarBilimleriContent").classList.add("hidden");
    document.getElementById("homeContent").classList.remove("hidden");
});

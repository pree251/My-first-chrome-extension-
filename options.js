let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1", 
"#CD5C5C",	"#F08080", "#FA8072", "#E9967A", 
"#FFA07A", "#DC143C", "#FF0000", "#B22222", 
"#8B0000", "#FF7F50", "#FF6347", "#FF4500",
"#FFD700", "#FFA500", "#FF8C00", "#7CFC00", 
"#7FFF00", "#32CD32", "#00FF00", "#228B22", 
"#008000", "#006400", "#00FF7F", "#00FA9A", 
"#90EE90", "#3CB371", "#2E8B57", "#808000", 
"#6B8E23", "#00FFFF", "#40E0D0", "#00CED1", 
"#20B2AA", "#008B8B", "#008080", "#87CEFA", 
"#00BFFF", "#1E90FF", "#6495ED", "#4169E1", 
"#0000FF", "#0000CD", "#00008B", "#000080",
"#191970", "#7B68EE", "#6A5ACD", "#483D8B", 
"#FFC0CB", "#FF69B4", "#FF1493", "#DB7093", 
"#C71585", "#DDA0DD", "#EE82EE", "#DA70D6", 
"#FF00FF", "#BA55D3", "#8A2BE2", "#9400D3", 
"#8B008B", "#800080", "#4B0082", "#F5F5DC", 
"#FFFAF0", "#FFFFF0", "	#FAEBD7", "#FAF0E6", 
"#FFF0F5", "#FFE4E1", "#C0C0C0", "#708090", 
"#BC8F8F", "#F4A460", "#DAA520", "#CD853F", 
"#D2691E", "#8B4513", "#A0522D", "#A52A2A", 
"#800000", "#F0FFFF", "	#F0F8FF", "#F8F8FF", 
"#F5F5F5", "#F5FFFA", "#FFEFD5", "#FFDAB9", "#F0E68C", "#000000"];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);


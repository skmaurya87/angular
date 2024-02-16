function toggleTheme() {
    // Get the <html> element
    var htmlElement = document.getElementById("theme-toggle");

    // Toggle the "dark" class on the <html> element
    htmlElement.classList.toggle("dark");

    // Check if the "dark" class is present after toggling
    var isDarkMode = htmlElement.classList.contains("dark");

    // Update the button text based on the theme
    var themeButton = document.getElementById("themeButton");
    themeButton.innerText = isDarkMode ? "Light" : "Dark";
  }


  function showResult(listId) {
    // Get references to the elements in the clicked list
    const clickedList = document.getElementById(listId);
    const image = clickedList.querySelector('img');
    const heading = clickedList.querySelector('.productName');
    const description = clickedList.querySelector('.description');

    // Get the content from the clicked list
    const imageUrl = image.src;
    const headingText = heading.innerText;
    const descriptionText = description.innerText;

    // Set the content to the result div
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <img class='object-cover rounded w-full h-96 md:h-auto md:w-[250px]' src="${imageUrl}" alt="${headingText}">
      <div class='flex flex-col justify-between px-4 leading-normal'>
      <div class='mb-2 mt-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>${headingText}</div>
      <p class='mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm leading-6'>${descriptionText}</p>
      </div>
    `;
  }


  
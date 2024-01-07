// Функция для удаления дубликатов вкладок
function removeDuplicateTabs() {
  // Получаем список всех открытых вкладок
  chrome.tabs.query({}, function (tabs) {
    var tabUrls = {}; // Объект для хранения URL-адресов вкладок
    var tabsToRemove = []; // Массив для хранения идентификаторов дублирующихся вкладок

    // Перебираем все вкладки
    tabs.forEach(function (tab) {
      var tabUrl = tab.url;

      // Если URL-адрес уже существует в объекте tabUrls, его вкладка является дублирующейся
      if (tabUrls.hasOwnProperty(tabUrl)) {
        tabsToRemove.push(tab.id); // Добавляем идентификатор вкладки в массив для удаления
      } else {
        tabUrls[tabUrl] = true; // Добавляем URL-адрес в объект tabUrls
      }
    });

    // Удаляем дублирующиеся вкладки
    chrome.tabs.remove(tabsToRemove, function () {
      console.log("Removed duplicate tabs"); // Выводим сообщение в консоль
    });
  });
}

// Вызываем функцию removeDuplicateTabs, когда пользователь нажимает на иконку расширения
chrome.browserAction.onClicked.addListener(removeDuplicateTabs);